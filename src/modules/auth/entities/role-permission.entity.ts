import { Column, Entity } from 'typeorm';

@Entity({
  name: 'role_permission',
})
export class RolePermissionEntity {
  @Column({
    primary: true,
    comment: '角色主键',
  })
  roleId: string;

  @Column({
    primary: true,
    comment: '权限主键',
  })
  permissionId: string;
}
