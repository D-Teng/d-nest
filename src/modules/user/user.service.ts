import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Connection, EntityManager, Repository } from 'typeorm';
import { CreateUserDto, CreateSettingsDto } from './dto/create-dto';
import { UpdateDto, UpdateUserDto, UpdateSettingsDto } from './dto/update-dto';
import { UserSettingsEntity } from './entity/user-settings.entity';
import { UserEntity } from './entity/user.entity';

//TODO bcrtpy加密password

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingsEntity)
    private readonly userSettingsRepository: Repository<UserSettingsEntity>,
    private readonly connection: Connection,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
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
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createSettings(
    createSettingsDto: CreateSettingsDto,
  ): Promise<UserSettingsEntity> {
    const userSettings = this.userSettingsRepository.create(createSettingsDto);
    await this.userSettingsRepository.save(userSettings);
    return userSettings;
  }

  async delete(id: string, manager: EntityManager): Promise<string> {
    await manager.delete(UserSettingsEntity, {
      user: id,
    });
    await manager.delete(UserEntity, id);
    return id;
  }

  async update(
    id: string,
    updateDto: UpdateDto,
    manager: EntityManager,
  ): Promise<string> {
    function t<T, U>(a: any, b: any) {
      return b;
    }
    const updateUserDto = new UpdateUserDto(updateDto);
    const updateSettingsDto = new UpdateSettingsDto(updateDto);
    await manager.update(
      UserSettingsEntity,
      {
        user: id,
      },
      updateSettingsDto,
    );
    await manager.update(UserEntity, id, updateUserDto);
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
        firstName: username,
      },
      // {
      //   relations: ['settings'],
      // },
    );
  }
}
