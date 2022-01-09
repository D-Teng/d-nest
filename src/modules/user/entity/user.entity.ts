import {
  AbstractEntity,
  IAbstractEntity,
} from '../../../common/entity/abstract.entity';
import { RoleType } from '../../../constants';
import { Column, Entity, OneToOne } from 'typeorm';
import {
  IUserSettingsEntity,
  UserSettingsEntity,
} from './user-settings.entity';

export interface IUserEntity extends IAbstractEntity {
  firstName: string;

  lastName: string;

  role: RoleType;

  email: string;

  password: string;

  phone: string;

  avatar: string;

  fullName: string;

  settings: IUserSettingsEntity;
}

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity implements IUserEntity {
  @Column({
    unique: true,
  })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  fullName: string;

  @OneToOne(
    () => UserSettingsEntity,
    (userSettingsEntity) => userSettingsEntity.user,
  )
  settings: UserSettingsEntity;
}
