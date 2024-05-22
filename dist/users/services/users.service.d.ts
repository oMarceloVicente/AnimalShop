import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    update(id: string, user: User): Promise<User>;
    delete(id: number): Promise<void>;
}
