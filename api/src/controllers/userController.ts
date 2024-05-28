import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { CreateUserDto } from "../dto/userDto";
import { IUser } from "../interfaces/userInterface";

export class UserController {
  private userService = new UserService();

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const createUserDto: CreateUserDto = req.body;
      const user: IUser = await this.userService.createUser(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users: IUser[] = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      const user: IUser | null = await this.userService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      const updateUserDto: Partial<CreateUserDto> = req.body;
      const [rowsAffected, updatedUsers] = await this.userService.updateUser(
        userId,
        updateUserDto
      );
      if (updatedUsers?.length) {
        res.status(200).json(updatedUsers);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      const destroyedRows: number = await this.userService.deleteUser(
        userId
      );
      if (destroyedRows) {
        res.status(200).json(destroyedRows);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };
}
