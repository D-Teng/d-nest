import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request, UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ResponseBuilder } from 'src/commons/response-builder';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { AuthService } from './auth.service';
import { ROLE_TYPE } from './constants/role-type.constant';
import { STRATEGY_LOCAL } from './constants/strategy.constant';
// import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';

// @UseInterceptors(LoggingInterceptor)
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    console.log('AuthController');
  }

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('login')
  @UseGuards(AuthGuard(STRATEGY_LOCAL))
  async login(@Request() req) {
    const authToken = await this.authService.login(req, req.user);
    return ResponseBuilder.buildSuccess(authToken);
  }

  @Get('role1')
  @Auth([ROLE_TYPE.USER])
  getRole1(@User('777') user: any): string {
    return 'role1';
  }

  @Get('role2')
  @Auth([ROLE_TYPE.USER])
  getRole2(): string {
    return 'role2';
  }

  @Get('error')
  throw() {
    throw new HttpException('hi', HttpStatus.FORBIDDEN);
  }
}
