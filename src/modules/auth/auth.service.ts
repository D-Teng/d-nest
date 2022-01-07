import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    const n = this.configService.get<string>('DB_DATABASE');
    return 'Hello auth ' + n;
  }
}
