import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class PaginationInputDto {
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

export class PaginationOutputDto<T> {
  data: T[];

  count: number;

  page: number;

  size: number;

  @Expose()
  get totalPages() {
    return Math.ceil(this.count / this.size);
  }
}
