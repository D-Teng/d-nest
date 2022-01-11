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
import { ArticleService } from './article.service';

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
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
