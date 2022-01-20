import { EntityRepository, Repository } from 'typeorm';
import { ArticleEntity } from '../entities/article.entity';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {}
