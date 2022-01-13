import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ResponseData } from 'src/common/response-data';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { AuthService } from './auth.service';
import { ROLE_TYPE } from './constants/role-type.constant';
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
    const authToken = this.authService.login(req, req.user);
    return ResponseData.buildSuccess(authToken);
  }

  @Get('role1')
  @Auth([ROLE_TYPE.USER])
  getRole1(@User('777') user: any): string {
    return 'role1';
  }

  @Get('role2')
  @Auth([ROLE_TYPE.USER])
  // @HttpCode(HttpStatus.OK)
  getRole2(): string {
    return 'role2';
  }

  @Get('error')
  throw() {
    throw new HttpException('hi', HttpStatus.FORBIDDEN);
  }
}
