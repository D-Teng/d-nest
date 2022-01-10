import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface IAbstractEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
