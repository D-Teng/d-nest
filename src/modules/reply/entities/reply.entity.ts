import { BaseEntity } from 'src/common/entity/base.entity';
import { CommentEntity } from 'src/modules/comment/entities/comment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'reply' })
export class ReplyEntity extends BaseEntity {
  @Column({
    comment: '回复内容',
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

  @ManyToOne(() => CommentEntity, (comment) => comment.id)
  comment: CommentEntity;

  @ManyToOne(() => ReplyEntity, (reply) => reply.id)
  reply: ReplyEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
