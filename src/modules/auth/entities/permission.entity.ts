import { AbstractEntity } from 'src/common/entity/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'permission',
})
export class PermissionEntity extends AbstractEntity {
  @Column({
    unique: true,
    length: '50',
    comment: '权限名',
  })
  name: string;

  @Column({
    nullable: true,
    default: null,
    length: '1000',
    comment: '类型为页面时，代表前端路由地址，类型为按钮时，代表后端接口地址',
  })
  url: string;

  @Column({
    comment: '权限类型，页面-1，按钮-2',
  })
  type: number;

  @Column({
    nullable: true,
    default: null,
    length: '50',
    comment: '权限表达式',
  })
  permission: string;

  @Column({
    nullable: true,
    default: null,
    length: '50',
    comment: '后端接口访问方式',
  })
  method: string;

  @Column({
    comment: '排序',
  })
  sort: number;

  @Column({
    comment: '父级id',
  })
  parentId: string;
}
