import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // get all users
  async findAll() {
    return await this.usersRepository.find();
  }

  // get one users
  async findOne(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  // create
  async create(user: Partial<User>) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      return existingUser;
    }

    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  // update user
  async update(id: string, user: User) {
    await this.usersRepository.update(id, user);
    return await this.usersRepository.findOne({ where: { id } });
  }

  // delete user
  async delete(id: number) {
    await this.usersRepository.delete(id);
  }
}
