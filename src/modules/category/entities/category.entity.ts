import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity extends AbstractEntity {
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
    comment: '排序',
  })
  sortOrder: number;

  @Column({
    comment: '父级id,id=0代表根节点',
  })
  parentId: string;
}
