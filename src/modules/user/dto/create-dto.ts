import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  // Checks if given value is not empty (!== '', !== null, !== undefined).
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
}

export class CreateSettingsDto {
  @ApiProperty()
  @IsBoolean()
  isEmailVerified: boolean;

  @ApiProperty()
  @IsBoolean()
  isPhoneVerified: boolean;
}
