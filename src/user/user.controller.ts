import { GetUser } from './../auth/decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, Get, UseGuards, Req, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('list')
  getUsers(@GetUser() user: User) {
    return user;
  }

  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() dto: UserDto) {
    return this.userService.editUser(userId, dto);
  }
}
