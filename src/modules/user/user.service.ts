import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateSettingsDto, CreateUserDto } from './dtos/create-dto';
import { UpdateDto, UpdateSettingsDto, UpdateUserDto } from './dtos/update-dto';
import { UserSettingsEntity } from './entities/user-settings.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingsEntity)
    private readonly userSettingsRepository: Repository<UserSettingsEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const settings = await this.createSettings(
      plainToInstance(CreateSettingsDto, {
        isEmailVerified: false,
        isPhoneVerified: false,
      }),
    );
    const user = this.userRepository.create(createUserDto);
    user.settings = settings;
    await this.userRepository.save(user);
    return user;
  }

  async createSettings(
    createSettingsDto: CreateSettingsDto,
  ): Promise<UserSettingsEntity> {
    const userSettings = this.userSettingsRepository.create(createSettingsDto);
    await this.userSettingsRepository.save(userSettings);
    return userSettings;
  }

  async delete(id: string): Promise<string> {
    await this.userSettingsRepository.delete({
      user: {
        id,
      },
    });
    await this.userRepository.delete(id);
    return id;
  }

  async update(id: string, updateDto: UpdateDto): Promise<string> {
    const updateUserDto = new UpdateUserDto(updateDto);
    const updateSettingsDto = new UpdateSettingsDto(updateDto);
    await this.userSettingsRepository.update(
      {
        user: {
          id,
        },
      },
      updateSettingsDto,
    );
    await this.userRepository.update(id, updateUserDto);

    return id;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({
      relations: ['settings'],
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(
      { id },
      {
        relations: ['settings'],
      },
    );
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne(
      {
        username,
      },
      // {
      //   relations: ['settings'],
      // },
    );
  }
}
