import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/response-data';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateUserDto } from './dtos/create-dto';
import { UserDto } from './dtos/retrieve.dto';
import { UpdateUserDto } from './dtos/update-dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Transactional()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ResponseData<UserDto>> {
    const res = await this.userService.create(createUserDto);
    return ResponseData.buildSuccess(res);
  }

  @Delete(':id')
  @Transactional()
  async delete(@Param('id') id: string): Promise<ResponseData<string>> {
    const res = await this.userService.delete(id);
    return ResponseData.buildSuccess(res);
  }

  @Put(':id')
  @Transactional()
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseData<UserDto>> {
    const res = await this.userService.update(id, updateUserDto);
    return ResponseData.buildSuccess(res);
  }

  @Get()
  async findAll(): Promise<ResponseData<UserDto[]>> {
    const res = await this.userService.findAll();
    return ResponseData.buildSuccess(res);
  }

  @Get('page/:offset/size/:limit')
  async findPage(@Param() param: PaginationDto): Promise<ResponseData<any>> {
    const res = await this.userService.findPage(param);
    return ResponseData.buildSuccess(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData<UserDto>> {
    const res = await this.userService.findOne(id);
    return ResponseData.buildSuccess(res);
  }
}
