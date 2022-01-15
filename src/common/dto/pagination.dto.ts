import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export abstract class PaginationDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  page: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  size: number;
}
