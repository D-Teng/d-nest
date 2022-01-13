import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';
import { ArticleEntity } from '../entities/article.entity';
// IsEmail,
// IsNotEmpty,
// IsOptional,
// IsPhoneNumber,
// MinLength,
export class ArticleDto extends BaseDto<ArticleEntity> {
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
