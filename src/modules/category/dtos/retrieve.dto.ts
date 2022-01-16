import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { BaseDto } from 'src/common/dto/base.dto';
import { PaginationInputDto } from 'src/common/dto/pagination.dto';

export class CategoryDto extends BaseDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiPropertyOptional()
  @Expose()
  status: number;

  @ApiPropertyOptional()
  @Expose()
  sortOrder: number;

  @ApiPropertyOptional()
  @Expose()
  parentId: string;
}

export class CategorySearchDto extends PaginationInputDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value), { toClassOnly: true })
  id: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value), { toClassOnly: true })
  status: string;
}
