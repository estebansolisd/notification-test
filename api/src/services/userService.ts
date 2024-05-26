import { UserRepository } from '../repositories/userRepository';
import { IUser } from '../interfaces/userInterface';
import { CreateUserDto } from '../dto/userDto';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    return this.userRepository.create(createUserDto);
  }

  async getUsers(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async getUserById(id: number): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: number, updateUserDto: Partial<CreateUserDto>): Promise<[number, IUser[]]> {
    return this.userRepository.update(id, updateUserDto);
  }

  async deleteUser(id: number): Promise<number> {
    return this.userRepository.delete(id);
  }
}
