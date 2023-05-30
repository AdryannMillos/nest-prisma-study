import { GetUser } from './../auth/decorator';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('list')
  getUsers(@GetUser() user: User) {
    return user;
  }
}
