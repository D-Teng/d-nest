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
import { IsNumber } from 'class-validator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dtos/category.dto';

function dtoFactory(...args: any[]) {
  args.forEach((v) => {});
}

@Controller('category')
@ApiTags('category')
export class CategoryController {
  constructor(private readonly category: CategoryService) {}
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
  post(@Body() categoryDto: CategoryDto) {
    return categoryDto;
  }
}
