import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSettingsDto {
  @IsBoolean()
  isEmailVerified: boolean;
  @IsBoolean()
  isPhoneVerified: boolean;
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
