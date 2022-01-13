import {
  Body,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseDto } from 'src/common/dto/base.dto';
import { ArticleService } from './article.service';
import { ArticleDto } from './dtos/article-dto';

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

  @Put(':id')
  putById(@Param('id') id: string, @Body() params: ArticleDto) {
    return id;
  }

  @Post()
  async post(@Body() params: ArticleDto): Promise<any> {
    // console.log(params);
    return params;
  }
}
