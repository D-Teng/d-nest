import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOutputDto } from 'src/common/dto/pagination.dto';
import { ResponseBuilder } from 'src/common/response-builder';
import { EmptyFilterPipe } from 'src/pipes/empty-filter.pipe';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create.dto';
import { CategoryDto, CategorySearchDto } from './dtos/retrieve.dto';
import { UpdateCategoryDto } from './dtos/update.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseBuilder<CategoryDto>> {
    const res = await this.categoryService.create(createCategoryDto);
    return ResponseBuilder.buildSuccess(res);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseBuilder<string>> {
    const res = await this.categoryService.delete(id);
    return ResponseBuilder.buildSuccess(res);
  }

  @Put(':id')
  @Transactional()
  async update(
    @Param('id') id: string,
    @Body(new EmptyFilterPipe()) updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseBuilder<CategoryDto>> {
    const res = await this.categoryService.update(id, updateCategoryDto);
    return ResponseBuilder.buildSuccess(res);
  }

  @Get()
  async findAll(): Promise<ResponseBuilder<CategoryDto[]>> {
    const res = await this.categoryService.findAll();
    return ResponseBuilder.buildSuccess(res);
  }

  @Get('list')
  async findPage(
    @Query(new EmptyFilterPipe()) query: CategorySearchDto,
  ): Promise<ResponseBuilder<PaginationOutputDto<CategoryDto>>> {
    const res = await this.categoryService.findPage(query);
    return ResponseBuilder.buildSuccess(res);
  }

  @Get(':id')
  async getById(
    @Param('id') id: string,
  ): Promise<ResponseBuilder<CategoryDto>> {
    const res = await this.categoryService.findOne(id);
    return ResponseBuilder.buildSuccess(res);
  }
}
