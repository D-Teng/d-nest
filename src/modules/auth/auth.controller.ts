import {
  Controller,
  Request,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
// import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

// @UseInterceptors(LoggingInterceptor)
@Controller('auth')
// @Auth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('role1')
  getRole1(@User('234') user: any): string {
    return 'role1';
  }

  @Get('role2')
  getRole2(): string {
    return 'role2';
  }

  @Get('error')
  throw() {
    throw new HttpException('hi', HttpStatus.FORBIDDEN);
  }
}
