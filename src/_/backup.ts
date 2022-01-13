import { Exclude, Expose } from 'class-transformer';
import { ROLE_TYPE } from 'src/modules/auth/constants/role-type.constant';
import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../common/entity/base.entity';
import { UserSettingsEntity } from '../modules/user/entities/user-settings.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({
    unique: true,
  })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'enum', enum: ROLE_TYPE, default: ROLE_TYPE.USER })
  role: ROLE_TYPE;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @OneToOne(
    () => UserSettingsEntity,
    (userSettingsEntity) => userSettingsEntity.user,
  )
  settings: UserSettingsEntity;
}
