import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
// IsEmail,
// IsNotEmpty,
// IsOptional,
// IsPhoneNumber,
// MinLength,
export class ArticleDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  keyword: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNumber()
  type: number;
}
