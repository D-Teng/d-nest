import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @IsString()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  keyword: string;

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
  authorId: string;
}
