import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export abstract class PaginationDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  page: number;

  @ApiProperty()
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  size: number;
}
