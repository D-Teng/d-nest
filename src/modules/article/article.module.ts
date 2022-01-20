import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleEntity } from './entities/article.entity';
import { ArticleRepository } from './repositories/article.repository';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    TypeOrmModule.forFeature([ArticleEntity, ArticleRepository]),
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
