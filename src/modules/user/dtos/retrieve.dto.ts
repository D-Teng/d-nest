import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseDto } from 'src/common/dto/base.dto';
import { ROLE_TYPE } from 'src/modules/auth/constants/role-type.constant';

export class UserSettingsDto {
  @ApiProperty()
  @Expose()
  isEmailVerified: boolean;

  @ApiPropertyOptional()
  @Expose()
  isPhoneVerified: boolean;
}

export class UserDto extends BaseDto {
  @ApiProperty()
  @Expose()
  username: string;

  @ApiPropertyOptional()
  @Expose()
  firstName: string;

  @ApiPropertyOptional()
  @Expose()
  lastName: string;

  @ApiPropertyOptional({ enum: ROLE_TYPE })
  @Expose()
  role: ROLE_TYPE;

  @ApiPropertyOptional()
  @Expose()
  email: string;

  @ApiPropertyOptional()
  @Expose()
  avatar: string;

  @ApiPropertyOptional()
  @Expose()
  phone: string;

  @ApiPropertyOptional()
  @Type(() => UserSettingsDto)
  @Expose()
  settings: UserSettingsDto;
}
