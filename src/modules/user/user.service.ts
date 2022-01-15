import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginationBuilder } from 'src/common/pagination-builder';
import { Repository } from 'typeorm';
import { CreateSettingsDto, CreateUserDto } from './dtos/create.dto';
import { UserDto } from './dtos/retrieve.dto';
import { UpdateUserDto } from './dtos/update.dto';
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

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { settings, ...userDto } = createUserDto;
    const _settings = await this.createSettings(settings);
    const user = this.userRepository.create(userDto);
    user.settings = _settings;
    await this.userRepository.save(user);
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const { settings, ...user } = await this.userRepository.findOne(
      { id },
      {
        relations: ['settings'],
      },
    );
    const { settings: _settings, ..._user } = updateUserDto;

    if (_settings) {
      await this.userSettingsRepository.update(
        {
          user: {
            id,
          },
        },
        _settings,
      );
    }

    await this.userRepository.update(id, _user);

    return plainToInstance(
      UserDto,
      {
        ...user,
        ..._user,
        settings: { ...settings, ..._settings },
      },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async findAll(): Promise<UserDto[]> {
    const userEntities = await this.userRepository.find({
      relations: ['settings'],
    });
    return plainToInstance(UserDto, userEntities, {
      excludeExtraneousValues: true,
    });
  }

  async findPage(param: PaginationDto) {
    const paginationBuilder = new PaginationBuilder<UserEntity>(
      this.userRepository,
      {
        ...param,
        relations: ['settings'],
      },
    );
    return paginationBuilder.build();
  }

  async findOne(id: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findOne(
      { id },
      {
        relations: ['settings'],
      },
    );
    console.log('userEntity', userEntity);
    return plainToInstance(UserDto, userEntity, {
      excludeExtraneousValues: true,
    });
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
