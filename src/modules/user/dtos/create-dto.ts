import { ApiProperty } from '@nestjs/swagger';
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

export class CreateSettingsDto {
  @ApiProperty()
  @IsBoolean()
  isEmailVerified: boolean;

  @ApiProperty()
  @IsBoolean()
  isPhoneVerified: boolean;
}

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  // Checks if given value is not empty (!== '', !== null, !== undefined).
  @IsNotEmpty()
  username: string;

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
  email: string;

  @ApiProperty({ minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSettingsDto)
  settings: CreateSettingsDto;
}
