import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { DtoBuilder } from './dto-builder';
import { PaginationOutputDto } from './dto/pagination.dto';
import { ClassConstructor } from './types/class-constructor.type';

export interface PaginationOptions<T> extends FindOneOptions<T> {
  page: number;
  size: number;
}

export class PaginationBuilder<T> {
  repository: Repository<T>;
  page: number;
  size: number;
  options: FindManyOptions<T>;

  constructor(repository: Repository<T>, options: PaginationOptions<T>) {
    let { page, size, order = { createdAt: 'ASC' }, ...others } = options;
    this.page = page;
    this.size = size;
    this.repository = repository;
    this.options = {
      take: size,
      skip: (page - 1) * size,
      order: order,
      ...others,
    };
  }

  async _build(): Promise<Omit<PaginationOutputDto<T>, 'totalPages'>> {
    let [data, count] = await this.repository.findAndCount(this.options);
    let { page, size } = this;
    return {
      data,
      count,
      page,
      size,
    };
  }

  async build<K>(cls: ClassConstructor<K>): Promise<PaginationOutputDto<K>> {
    let [data, count] = await this.repository.findAndCount(this.options);
    let { page, size } = this;

    return new DtoBuilder<PaginationOutputDto<K>>(
      PaginationOutputDto,
      {},
    ).build({
      data: new DtoBuilder(cls, {}).build(data),
      count,
      page,
      size,
    });
  }
}
