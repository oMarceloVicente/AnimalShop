import { UsersService } from "../services/users.service";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { ConfigService } from "@nestjs/config";
export declare class UsersController {
    private readonly usersService;
    private configService;
    constructor(usersService: UsersService, configService: ConfigService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<{
        statusCode: number;
        message: string;
        data: User;
    }>;
    update(id: string, updatedUserDto: User): Promise<User>;
    delete(id: number): Promise<void>;
}
