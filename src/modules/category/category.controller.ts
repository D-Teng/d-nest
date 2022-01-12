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
import { CategoryService } from './category.service';

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
  post(@Body() params) {
    return params;
  }
}
