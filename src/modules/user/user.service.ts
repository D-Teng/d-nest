import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { CreateSettingsDto, CreateUserDto } from './dtos/create-dto';
import { UserDto } from './dtos/retrieve.dto';
import { UpdateUserDto } from './dtos/update-dto';
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
    const _userDto = plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
    return _userDto;
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
    const { settings, ...userDto } = updateUserDto;
    await this.userSettingsRepository.update(
      {
        user: {
          id,
        },
      },
      settings,
    );
    await this.userRepository.update(id, userDto);
    const _userDto = plainToInstance(
      UserDto,
      {
        id,
        ...updateUserDto,
      },
      {
        excludeExtraneousValues: true,
      },
    );
    return _userDto;
  }

  async findAll(): Promise<UserDto[]> {
    const userEntities = await this.userRepository.find({
      relations: ['settings'],
    });
    const userDtos = plainToInstance(UserDto, userEntities, {
      excludeExtraneousValues: true,
    });
    return userDtos;
  }

  async findPage(param: PaginationDto) {
    const { limit, offset } = param;
    let [userEntities, count] = await this.userRepository.findAndCount({
      where: {},
      take: parseInt(limit),
      skip: parseInt(offset),
    });
    return {
      data: userEntities,
      count,
    };
  }

  async findOne(id: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findOne(
      { id },
      {
        relations: ['settings'],
      },
    );
    const userDto = plainToInstance(UserDto, userEntity, {
      excludeExtraneousValues: true,
    });
    return userDto;
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
