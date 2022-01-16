import { plainToInstance } from 'class-transformer';
import { FindManyOptions, Repository } from 'typeorm';
import { PaginationOutputDto } from './dto/pagination.dto';

export interface PaginationOptions {
  page: number;
  size: number;
  where?: any;
  order?: any;
  relations?: any;
}

export class PaginationBuilder<T> {
  repository: Repository<T>;
  page: number;
  size: number;
  options: FindManyOptions<T>;
  constructor(repository: Repository<T>, options: PaginationOptions) {
    let {
      page,
      size,
      where = {},
      order = { createdAt: 'ASC' },
      ...others
    } = options;
    this.page = page;
    this.size = size;
    this.repository = repository;
    this.options = {
      where: where,
      take: size,
      skip: (page - 1) * size,
      order: order,
      ...others,
    };
  }
  async build(): Promise<PaginationOutputDto<T>> {
    let [data, count] = await this.repository.findAndCount(this.options);
    let { page, size } = this;
    return plainToInstance(PaginationOutputDto, {
      data,
      count,
      page,
      size,
    });
  }
}
