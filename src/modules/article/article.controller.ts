import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseBuilder } from 'src/common/response-builder';
import { Auth } from 'src/decorators/auth.decorator';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ROLE_TYPE } from '../auth/constants/role-type.constant';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dtos/create.dto';
import { ArticleDto } from './dtos/retrieve-dto';

@Controller('article')
@ApiTags('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  get() {
    return 'Get';
  }

  @Post()
  @Transactional()
  @Auth([ROLE_TYPE.USER])
  async create(
    @Req() request,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ResponseBuilder<ArticleDto>> {
    const res = await this.articleService.create(request, createArticleDto);
    return ResponseBuilder.buildSuccess(res);
  }
}
