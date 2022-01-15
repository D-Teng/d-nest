import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends BaseEntity {
  @Column({
    unique: true,
    length: '50',
    comment: '分类名称',
  })
  name: string;

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
    nullable: true,
    comment: '父级id',
  })
  parentId: string;
}
