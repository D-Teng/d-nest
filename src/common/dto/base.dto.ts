import { ApiProperty } from '@nestjs/swagger';

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

export abstract class BaseDto<T> extends BuildDto<T> {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
