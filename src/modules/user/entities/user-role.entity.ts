import { Column, Entity } from 'typeorm';

@Entity({
  name: 'user_role',
})
export class UserRoleEntity {
  @Column({
    primary: true,
    comment: '用户主键',
  })
  userId: string;

  @Column({
    primary: true,
    comment: '角色主键',
  })
  roleId: string;
}
