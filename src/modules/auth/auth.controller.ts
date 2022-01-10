import {
  Controller,
  Request,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/decorators/auth.decorator';
import { RoleType } from 'src/constants';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
// import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

// @UseInterceptors(LoggingInterceptor)
@Controller('auth')
@ApiTags('auth')
// @Auth()
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('AuthController');
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(req.user);
  }

  @Get('role1')
  @Auth([RoleType.USER])
  getRole1(@User('777') user: any): string {
    return 'role1';
  }

  @Get('role2')
  @Auth([RoleType.USER])
  // @HttpCode(HttpStatus.OK)
  getRole2(): string {
    return 'role2';
  }

  @Get('error')
  throw() {
    throw new HttpException('hi', HttpStatus.FORBIDDEN);
  }
}
