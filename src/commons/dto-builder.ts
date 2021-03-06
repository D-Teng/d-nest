import { ClassTransformOptions, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { PaginationOutputDto } from './dtos/pagination.dto';
import { PaginationBuilder, PaginationOptions } from './pagination-builder';
import { ResponseBuilder } from './response-builder';
import { ClassConstructor } from './types/class-constructor.type';

export class DtoBuilder<T> {
  cls: ClassConstructor<T>;
  options?: ClassTransformOptions;

  constructor(cls: ClassConstructor<T>, options?: ClassTransformOptions) {
    this.cls = cls;
    this.options = options ?? { excludeExtraneousValues: true };
  }

  build(plain: Array<unknown>): T[];
  build(plain: unknown): T;
  build(plain: unknown): unknown {
    return plainToInstance(this.cls, plain, this.options);
  }

  async buildPagination<K>(
    repository: Repository<K>,
    options: PaginationOptions<K>,
  ) {
    const { page, size, data, count } = await new PaginationBuilder<K>(
      repository,
      options,
    )._build();

    const paginationOutputDto = <PaginationOutputDto<T>>(
      plainToInstance(PaginationOutputDto, {
        data: plainToInstance(this.cls, data, {
          excludeExtraneousValues: true,
        }),
        count,
        page,
        size,
      })
    );

    return {
      buildResponse(): ResponseBuilder<PaginationOutputDto<T>> {
        return ResponseBuilder.buildSuccess(paginationOutputDto);
      },
      build(): PaginationOutputDto<T> {
        return paginationOutputDto;
      },
    };
  }

  buildResponse(plain: Array<unknown>): ResponseBuilder<T[]>;
  buildResponse(plain: unknown): ResponseBuilder<T>;
  buildResponse(plain: unknown): unknown {
    return ResponseBuilder.buildSuccess(this.build(plain));
  }
}
