import { JwtGuard } from './../auth/guard/jwt.guard';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('list')
  getUsers(@Req() req: Request) {
    return 'user';
  }
}
