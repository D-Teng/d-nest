import {
  Body,
  // ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  // UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { CreateUserDto } from './dto/create-dto';
import { UpdateDto } from './dto/update-dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

// @UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.userService.create(createUserDto);
    return createdUser;
  }

  @Delete(':id')
  @Transaction()
  delete(
    @Param('id') id: string,
    @TransactionManager() manager: EntityManager,
  ): Promise<string> {
    return this.userService.delete(id, manager);
  }

  @Put(':id')
  @Transaction()
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
    @TransactionManager() manager: EntityManager,
  ): Promise<string> {
    return this.userService.update(id, updateDto, manager);
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
