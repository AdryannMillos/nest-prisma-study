import { UserDto } from './../../user/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: { userId: number; email: string }): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
    });
    const userDTO: UserDto = {
      id: user.id,
      email: user.email,
    };

    return userDTO;
  }
}
