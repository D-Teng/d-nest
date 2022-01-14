import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class UpdateSettingsDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isEmailVerified: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isPhoneVerified: boolean;
}

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

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateSettingsDto)
  settings: UpdateSettingsDto;
}
