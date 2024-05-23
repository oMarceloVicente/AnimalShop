import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { ConfigService } from "@nestjs/config";

@Controller("user")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private configService: ConfigService
  ) {}

  @Get() // GET/users or /users?role=value
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id") //GET/users/:id
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post() //POST/users
  async create(
    @Body()
    createUserDto: CreateUserDto
  ) {
    if (createUserDto.secret !== this.configService.get("AUTH_SECRET")) {
      throw new HttpException("Wrong secret provided", HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.create(createUserDto);
    if (user) {
      return {
        statusCode: 200,
        message: "User created successfully",
        data: user,
      };
    } else {
      throw new HttpException(
        "Failed to create user",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
  }

  @Put(":id") //PATH/users/:id
  update(
    @Param("id", ParseIntPipe) id: string,
    @Body(ValidationPipe)
    updatedUserDto: User
  ) {
    return this.usersService.update(id, updatedUserDto);
  }

  @Delete(":id") //  DELETE /users/:id
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
