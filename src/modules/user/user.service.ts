import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserSettingsEntity } from './entity/user-settings.entity';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingsEntity)
    private readonly userSettingsEntity: Repository<UserSettingsEntity>,
  ) {}

  async create(userRegisterDto: UserRegisterDto): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);
    await this.userRepository.save(user);
    return user;
  }

  // create(createUserDto: CreateUserDto): Promise<UserEntity> {
  //   const userEntity = new UserEntity();
  //   userEntity.firstName = createUserDto.firstName;
  //   userEntity.lastName = createUserDto.lastName;

  //   return this.userRepository.save(userEntity);
  // }

  // async findAll(): Promise<UserEntity[]> {
  //   return this.userRepository.find();
  // }

  // findOne(id: string): Promise<UserEntity> {
  //   return this.userRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }
}
