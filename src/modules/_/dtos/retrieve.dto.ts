import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/dto/base.dto';

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
