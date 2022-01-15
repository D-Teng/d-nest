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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseBuilder } from 'src/common/response-builder';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create.dto';
import { CategoryDto } from './dtos/retrieve.dto';

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async get(): Promise<ResponseBuilder<CategoryDto[]>> {
    const res = [];
    return ResponseBuilder.buildSuccess(res);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return id;
  }

  @Get('page/:page/size/:size')
  async findPage(@Param() param: PaginationDto) {
    const res = await this.categoryService.findPage(param);
    return ResponseBuilder.buildSuccess(res);
  }

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseBuilder<CategoryDto>> {
    const res = await this.categoryService.create(createCategoryDto);
    return ResponseBuilder.buildSuccess(res);
  }
}
