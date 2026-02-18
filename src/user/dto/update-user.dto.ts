import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";


export class UpdateUserDto {

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Nikitha Upadhya',
    required: false,
  })
  name: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    example : 'nikithaupadhya@example.com',
    required: false,
  })
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiProperty({
    example: 'newStrongPassword123',
    required: false,
  })
  password: string;
}