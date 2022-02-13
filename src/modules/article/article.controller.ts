import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOutputDto } from 'src/commons/dtos/pagination.dto';
import { ResponseBuilder } from 'src/commons/response-builder';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create.dto';
import { ArticleDto, ArticleSearchDto } from './dtos/retrieve-dto';

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  async findPage(
    @Query() query: ArticleSearchDto,
  ): Promise<ResponseBuilder<PaginationOutputDto<ArticleDto>>> {
    const res = await this.articleService.findPage(query);
    return ResponseBuilder.buildSuccess(res);
  }

  @Post()
  @Transactional()
  // @Auth([ROLE_TYPE.USER])
  async create(
    @Req() request,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ResponseBuilder<ArticleDto>> {
    const res = await this.articleService.create(request, createArticleDto);
    return ResponseBuilder.buildSuccess(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseBuilder<ArticleDto>> {
    const res = await this.articleService.findOne(id);
    return ResponseBuilder.buildSuccess(res);
  }
}
