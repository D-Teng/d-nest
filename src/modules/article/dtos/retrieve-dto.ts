import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { PaginationInputDto } from 'src/commons/dtos/pagination.dto';

export class ArticleDto {
  @ApiProperty()
  @IsString()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  keywords: string;

  @ApiProperty()
  @Expose()
  content: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  type: number;

  @ApiProperty()
  @Expose()
  status: number;

  @ApiProperty()
  @Expose()
  sortOrder: number;

  @ApiProperty()
  @Expose()
  browses: number;

  @ApiProperty()
  @Expose()
  likes: number;

  @ApiProperty()
  @Expose()
  authorId: string;
}

export class ArticleSearchDto extends PaginationInputDto {}
