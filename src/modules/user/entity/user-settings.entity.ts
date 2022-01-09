import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import {
  AbstractEntity,
  IAbstractEntity,
} from '../../../common/entity/abstract.entity';
import { IUserEntity, UserEntity } from './user.entity';

export interface IUserSettingsEntity extends IAbstractEntity {
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  user: IUserEntity;
}

@Entity({ name: 'user_settings' })
export class UserSettingsEntity
  extends AbstractEntity
  implements IUserSettingsEntity
{
  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isPhoneVerified: boolean;

  // @OneToOne(() => UserSettingsEntity, (userSettings) => userSettings.user)
  // @JoinColumn，这是必选项并且只能在关系的一侧设置。 你设置@JoinColumn的哪一方，哪一方的表将包含一个"relation id"和目标实体表的外键。
  // 同样，@JoinColumn必须仅设置在关系的一侧且必须在数据库表中具有外键的一侧。
  @OneToOne(() => UserEntity, (userEntity) => userEntity.settings)
  @JoinColumn()
  user: UserEntity;
}
