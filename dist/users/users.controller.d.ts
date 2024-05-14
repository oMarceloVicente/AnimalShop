import { UsersService } from "./users.service";
import { User } from "./user.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: User): Promise<User>;
    update(id: string, updatedUserDto: User): Promise<User>;
    delete(id: number): Promise<void>;
}
