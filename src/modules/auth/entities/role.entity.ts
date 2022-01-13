import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'role',
})
export class RoleEntity extends BaseEntity {
  @Column({
    unique: true,
    length: '50',
    comment: '角色名',
  })
  name: string;

  @Column({
    nullable: true,
    default: null,
    length: '100',
    comment: '描述',
  })
  description: string;
}
