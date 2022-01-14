import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

// export class BuildDto<T> {
//   constructor(entity: T | T[]) {
//     return plainToInstance(new.target, entity, {
//       excludeExtraneousValues: true,
//     });
//   }
// }

export abstract class BaseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
