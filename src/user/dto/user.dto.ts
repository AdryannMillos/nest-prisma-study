import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
}
