import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserDto } from './dto/user.dto';
// import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const createdUser = await this.userService.create(userRegisterDto);
    return createdUser;
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
  //   return this.userService.create(createUserDto);
  // }

  // @Get()
  // findAll(): Promise<UserEntity[]> {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<UserEntity> {
  //   return this.userService.findOne(id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string): Promise<void> {
  //   return this.userService.remove(id);
  // }
}
