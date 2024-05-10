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
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET/users or /users?role=value
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id") //GET/users/:id
  findOne(@Param("id", ParseIntPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Post() //POST/users
  create(
    @Body()
    createUserDto: User
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
