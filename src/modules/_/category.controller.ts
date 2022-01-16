import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseBuilder } from 'src/common/response-builder';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create.dto';
import { CategoryDto } from './dtos/retrieve.dto';

@Controller('——category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  get() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // return '123';
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return id;
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseBuilder<CategoryDto>> {
    const res = await this.categoryService.create(createCategoryDto);
    return ResponseBuilder.buildSuccess(res);
  }
}
