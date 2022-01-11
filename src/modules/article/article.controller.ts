import {
  Body,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
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
  @CacheKey('custom_key')
  @CacheTTL(20)
  get() {
    return 'article';
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
