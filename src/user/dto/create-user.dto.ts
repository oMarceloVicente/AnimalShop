import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNotEmpty, IsUrl } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  secret: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsIn(["google", "facebook"])
  provider: string;

  @ApiProperty()
  @IsNotEmpty()
  providerAccountId: string;
}
