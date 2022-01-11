import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
// IsEmail,
// IsNotEmpty,
// IsOptional,
// IsPhoneNumber,
// MinLength,
export class ArticleDto extends AbstractDto {
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
