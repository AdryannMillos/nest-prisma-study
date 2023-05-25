import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signup(dto: AuthDto) {
    try {
      console.log(true);
      const userFound = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (userFound) {
        throw new ForbiddenException('Email already exists');
      }
      const hashedPassword = await argon.hash(dto.password);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      return error.response;
    }
  }

  async signin(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Invalid credentials');
      }

      return this.signToken(user.id, user.email);
    } catch (error) {
      return error.response;
    }
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { userId, email };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET') || 'secret',
    });
    return {
      access_token: token,
    };
  }
}