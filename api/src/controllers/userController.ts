import { Request, Response } from "express";
import { CreateUserDto } from "../dto/userDto";
import { UserService } from "../services/userService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;

      // Basic validation
      if (!name || !password || !email) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const createUserDto = new CreateUserDto(name, email, password);
      const user = await this.userService.createUser(createUserDto);
      res.status(201).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };

  getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };

  getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(parseInt(id, 10));

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
      const { id } = req.params;
      const { firstName, lastName, email } = req.body;

      const updateUserDto = { firstName, lastName, email };
      const [updatedRowsCount, updatedRows] = await this.userService.updateUser(
        parseInt(id, 10),
        updateUserDto
      );

      if (updatedRowsCount === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(updatedRows[0]);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };

  deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedRowsCount = await this.userService.deleteUser(
        parseInt(id, 10)
      );

      if (deletedRowsCount === 0) {
        res.status(404).json({ message: "User not found" });
      } else {
        res.status(204).json();
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: (error as Record<string, string>).message });
    }
  };
}
