import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoBuilder } from 'src/common/dto-builder';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { UserService } from '../user/user.service';
import { CreateArticleDto } from './dtos/create.dto';
import { ArticleDto } from './dtos/retrieve-dto';
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    request,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleDto> {
    const user = await this.userService.findById(request.user.id);
    const article = this.articleRepository.create(createArticleDto);
    const category = await this.categoryService.findById(
      createArticleDto.categoryId,
    );
    article.author = user;
    article.category = category;
    await this.articleRepository.save(article);
    return new DtoBuilder(ArticleDto).build(article);
  }
}
