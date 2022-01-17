import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => String(value), { toClassOnly: true })
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  status: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  sortOrder: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => String(value), { toClassOnly: true })
  parentId: string;
}
