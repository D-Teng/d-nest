import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  @IsIn([0, 1])
  status: number;

  @IsNumber()
  @IsOptional()
  sortOrder: number;

  @IsString()
  @IsOptional()
  parentId: string;
}
