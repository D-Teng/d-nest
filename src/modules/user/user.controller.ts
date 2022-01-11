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
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateUserDto } from './dto/create-dto';
import { UpdateDto } from './dto/update-dto';
import { UserEntity } from './entity/user.entity';
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
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }
}
