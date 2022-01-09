import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { RoleType } from '../../../constants';

export class UserDto extends AbstractDto {
  @ApiProperty()
  username: string;

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
  isActive: boolean;
}
