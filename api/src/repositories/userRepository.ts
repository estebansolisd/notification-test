import User from '../models/user';

export class UserRepository {
  async create(user: Partial<User>): Promise<User> {
    return User.create(user);
  }

  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }

  async update(id: number, user: Partial<User>): Promise<[number, User[]]> {
    return User.update(user, { where: { id }, returning: true });
  }

  async delete(id: number): Promise<number> {
    return User.destroy({ where: { id } });
  }
}