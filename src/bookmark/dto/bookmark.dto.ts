import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BookmarkDto {
  @IsNumber()
  @IsOptional()
  id?: number;
  @IsNumber()
  @IsOptional()
  userId?: number;
  @IsString()
  @IsOptional()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsString()
  @IsOptional()
  link?: string;
}
