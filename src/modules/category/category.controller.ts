import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { ResponseBuilder } from 'src/common/response-builder';
import { EmptyFilterPipe } from 'src/pipes/empty-filter.pipe';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create.dto';
import { CategoryDto, CategorySearchDto } from './dtos/retrieve.dto';
import { CategoryEntity } from './entities/category.entity';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async get(
    @Query(new EmptyFilterPipe()) query: CategorySearchDto,
  ): Promise<ResponseBuilder<PaginationOutputDto<CategoryEntity>>> {
    const res = await this.categoryService.findPage(query);
    return ResponseBuilder.buildSuccess(res);
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseBuilder<CategoryDto>> {
    const res = await this.categoryService.create(createCategoryDto);
    return ResponseBuilder.buildSuccess(res);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return id;
  }
}
