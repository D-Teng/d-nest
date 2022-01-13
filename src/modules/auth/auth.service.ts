import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    console.log('AuthService');
  }

  getHello(): string {
    const n = this.configService.get<string>('DB_DATABASE');
    return 'Hello auth ' + n;
  }

  async login(req: any, user: any) {
    return this.getAuthToken(req, user);
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async getAuthToken(req: any, user: any) {
    const subject = { sub: user.id };

    const payload = { username: user.username, role: user.role };

    const authToken = {
      refreshToken: this.jwtService.sign(subject, {
        expiresIn: 1 * 60 * 60,
      }),
      accessToken: this.jwtService.sign(
        { ...payload, ...subject },
        { expiresIn: 2 * 60 * 60 },
      ),
    };

    return authToken;
  }
}
