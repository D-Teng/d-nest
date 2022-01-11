import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'article' })
export class ArticleEntity extends AbstractEntity {
  @Column()
  title: string;
  @Column()
  context: string;
  @ManyToOne(() => UserEntity, (user) => user.articles, {
    eager: true,
  })
  author: UserEntity;
}
