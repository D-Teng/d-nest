import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BuildDto } from 'src/common/dto/base.dto';
import { RoleType } from '../../../constants';
import { UserSettingsEntity } from '../entities/user-settings.entity';
import { UserEntity } from '../entities/user.entity';

export class UserSettingsDto extends BuildDto<UserSettingsEntity> {
  @ApiProperty()
  isEmailVerified: boolean;

  @ApiPropertyOptional()
  isPhoneVerified: boolean;

  constructor(data) {
    let keys = ['isEmailVerified', 'isPhoneVerified'];
    super(data, keys);
  }
}

export class UserDto extends BuildDto<UserEntity> {
  @ApiProperty()
  username: number;

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional({ enum: RoleType })
  role: RoleType;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  avatar: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  settings: UserSettingsDto;

  constructor(data) {
    let keys = [
      'username',
      'firstName',
      'lastName',
      'role',
      'email',
      'avatar',
      'phone',
    ];
    super(data, keys);
  }
}
