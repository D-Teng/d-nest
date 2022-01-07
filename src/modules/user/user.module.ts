import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserSettingsRepository } from './user-settings.repository';
// import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { UserSettingsEntity } from './entity/user-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserSettingsEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
