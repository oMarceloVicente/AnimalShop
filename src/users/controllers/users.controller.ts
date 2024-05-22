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
} from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET/users or /users?role=value
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id") //GET/users/:id
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post() //POST/users
  create(
    @Body()
    createUserDto: CreateUserDto
  ) {
    return this.usersService.create(createUserDto);
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
