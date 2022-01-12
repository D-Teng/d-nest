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
import { ResponseData } from 'src/common/response-data';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateUserDto } from './dtos/create-dto';
import { UpdateDto } from './dtos/update-dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Transactional()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Delete(':id')
  @Transactional()
  delete(@Param('id') id: string): Promise<string> {
    return this.userService.delete(id);
  }

  @Put(':id')
  @Transactional()
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<string> {
    return this.userService.update(id, updateDto);
  }

  @Get()
  async findAll(): Promise<ResponseData<UserEntity[]>> {
    const userEntities = await this.userService.findAll();
    return ResponseData.buildSuccess(userEntities);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }
}
