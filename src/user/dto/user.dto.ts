import { IsNotEmpty, IsEmail, IsNumber } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
