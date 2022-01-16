import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { PaginationBuilder } from 'src/common/pagination-builder';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create.dto';
import { CategoryDto } from './dtos/retrieve.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return plainToInstance(CategoryDto, category, {
      excludeExtraneousValues: true,
    });
  }

  async findPage(param) {
    console.log('category.service findPage', param);
    const { page, size, ...where } = param;
    const options = {
      page,
      size,
      where,
    };
    const paginationBuilder = new PaginationBuilder<CategoryEntity>(
      this.categoryRepository,
      options,
    );
    return paginationBuilder.build();
  }
}
