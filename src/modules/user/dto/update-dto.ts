import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  constructor(params) {
    ['firstName', 'lastName', 'email', 'password', 'phone'].forEach((v) => {
      if (params[v]) this[v] = params[v];
    });
  }
}

export class UpdateSettingsDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isEmailVerified: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isPhoneVerified: boolean;

  constructor(params) {
    ['isEmailVerified', 'isPhoneVerified'].forEach((v) => {
      if (params[v]) this[v] = params[v];
    });
  }
}

export class UpdateDto extends IntersectionType(
  UpdateUserDto,
  UpdateSettingsDto,
) {}
