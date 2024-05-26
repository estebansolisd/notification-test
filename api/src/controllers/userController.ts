import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { CreateUserDto } from '../dto/userDto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto = plainToInstance(CreateUserDto, req.body);
      const errors = await validate(createUserDto);

      if (errors.length > 0) {
        res.status(400).json(errors);
        return;
      }

      const user = await this.userService.createUser(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: (error as Record<string, string>).message });
    }
  };
}