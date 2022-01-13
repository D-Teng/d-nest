import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../entity/base.entity';

export class BuildDto<T> {
  constructor(entity: T, keys?: string[], skipEmpty: boolean = false) {
    if (!keys) {
      Object.assign(this, entity);
    } else {
      keys.forEach((key) => {
        if (skipEmpty && entity[key] === undefined) return;
        this[key] = entity[key];
      });
    }
  }
}

export abstract class BaseDto<T extends BaseEntity> extends BuildDto<T> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
