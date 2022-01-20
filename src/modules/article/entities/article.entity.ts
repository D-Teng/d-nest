import { BaseEntity } from 'src/common/entity/base.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'article' })
export class ArticleEntity extends BaseEntity {
  @Column({
    comment: '文章标题',
  })
  title: string;

  @Column({
    default: '',
    comment: '文章简介',
  })
  description: string;

  @Column({
    nullable: true,
    comment: '文章封面图',
  })
  coverUrl: string;

  @Column({
    default: '',
    comment: '文章内容',
  })
  content: string;

  @Column({
    default: '',
    comment: '文章关键字',
  })
  keywords: string;

  @Column({
    default: 1,
    comment: '0: 隐藏, 1: 正常',
  })
  status: number;

  @Column({
    default: 1,
    comment: '排序',
  })
  sortOrder: number;

  @Column({
    default: 0,
    comment: '浏览次数',
  })
  browses: number;

  @Column({
    default: 0,
    comment: '点赞次数',
  })
  likes: number;

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    eager: true,
  })
  author: UserEntity;

  @OneToOne(() => CategoryEntity)
  @JoinColumn()
  category: CategoryEntity;
}
