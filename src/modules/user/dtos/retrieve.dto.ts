import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BuildDto } from 'src/common/dto/base.dto';
import { ROLE_TYPE } from 'src/modules/auth/constants/role-type.constant';
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

  @ApiPropertyOptional({ enum: ROLE_TYPE })
  role: ROLE_TYPE;

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
