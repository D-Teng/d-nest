import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Connection, Repository } from 'typeorm';
import { CreateSettingsDto } from './dto/create-settings.dto';
import { CreateUserDto } from './dto/create-user-dto';
import { UserSettingsEntity } from './entity/user-settings.entity';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingsEntity)
    private readonly userSettingsEntity: Repository<UserSettingsEntity>,
    private readonly connection: Connection,
  ) {}

  async create(userRegisterDto: CreateUserDto): Promise<UserEntity> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = this.userRepository.create(userRegisterDto);
      await this.userRepository.save(user);
      user.settings = await this.createSettings(
        plainToInstance(CreateSettingsDto, {
          isEmailVerified: false,
          isPhoneVerified: false,
          userId: user.id,
        }),
      );
      return user;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createSettings(
    createSettingsDto: CreateSettingsDto,
  ): Promise<UserSettingsEntity> {
    const userSettings = this.userSettingsEntity.create(createSettingsDto);
    await this.userSettingsEntity.save(userSettings);
    return userSettings;
  }

  // create(createUserDto: CreateUserDto): Promise<UserEntity> {
  //   const userEntity = new UserEntity();
  //   userEntity.firstName = createUserDto.firstName;
  //   userEntity.lastName = createUserDto.lastName;

  //   return this.userRepository.save(userEntity);
  // }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  // findOne(id: string): Promise<UserEntity> {
  //   return this.userRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.userRepository.delete(id);
  // }
}
