import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseBuilder } from 'src/common/response-builder';
import { Auth } from 'src/decorators/auth.decorator';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateUserDto } from './dtos/create.dto';
import { UserDto } from './dtos/retrieve.dto';
import { UpdateUserDto } from './dtos/update.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@Request() req): Promise<ResponseBuilder<UserDto>> {
    return this.findOne(req.user.id);
  }

  @Post()
  @Transactional()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseBuilder<UserDto>> {
    const res = await this.userService.create(createUserDto);
    return ResponseBuilder.buildSuccess(res);
  }

  @Delete(':id')
  @Transactional()
  async delete(@Param('id') id: string): Promise<ResponseBuilder<string>> {
    const res = await this.userService.delete(id);
    return ResponseBuilder.buildSuccess(res);
  }

  @Put(':id')
  @Transactional()
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseBuilder<UserDto>> {
    const res = await this.userService.update(id, updateUserDto);
    return ResponseBuilder.buildSuccess(res);
  }

  @Get()
  async findAll(): Promise<ResponseBuilder<UserDto[]>> {
    const res = await this.userService.findAll();
    return ResponseBuilder.buildSuccess(res);
  }

  @Get('page/:page/size/:size')
  async findPage(@Param() param: PaginationDto): Promise<ResponseBuilder<any>> {
    const res = await this.userService.findPage(param);
    return ResponseBuilder.buildSuccess(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseBuilder<UserDto>> {
    const res = await this.userService.findOne(id);
    return ResponseBuilder.buildSuccess(res);
  }
}
