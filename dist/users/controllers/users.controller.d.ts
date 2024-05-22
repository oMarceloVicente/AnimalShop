import { UsersService } from "../services/users.service";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    update(id: string, updatedUserDto: User): Promise<User>;
    delete(id: number): Promise<void>;
}
