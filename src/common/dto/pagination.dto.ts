import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export abstract class PaginationDto {
  @ApiProperty()
  @IsString()
  limit: string;

  @ApiProperty()
  @IsString()
  offset: string;
}
