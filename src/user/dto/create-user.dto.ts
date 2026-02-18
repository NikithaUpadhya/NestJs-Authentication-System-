import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  
  @IsString()
  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({
    example : 'exampleemail@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'strongPassword123',
  })
  password: string;

}