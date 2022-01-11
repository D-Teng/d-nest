import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../../common/entity/abstract.entity';
import { RoleType } from '../../../constants';
import { UserSettingsEntity } from './user-settings.entity';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity {
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
  @Exclude()
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @OneToOne(
    () => UserSettingsEntity,
    (userSettingsEntity) => userSettingsEntity.user,
  )
  settings: UserSettingsEntity;
}
