import { BaseEntity } from 'src/commons/entities/base.entity';
import { ArticleEntity } from 'src/modules/article/entities/article.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'comment' })
export class CommentEntity extends BaseEntity {
  @Column({
    comment: '评论内容',
  })
  content: string;

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
    comment: '点赞次数',
  })
  likes: number;

  @ManyToOne(() => ArticleEntity, (article) => article.id)
  article: ArticleEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
