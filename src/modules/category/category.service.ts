import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DtoBuilder } from 'src/common/dto-builder';
import { PaginationBuilder } from 'src/common/pagination-builder';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create.dto';
import { CategoryDto } from './dtos/retrieve.dto';
import { UpdateCategoryDto } from './dtos/update.dto';
import { CategoryEntity } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const { parentId, ...category } = createCategoryDto;
    const categoryEntity = this.categoryRepository.create(category);
    if (parentId) {
      const parentEntity = await this.findById(parentId);
      categoryEntity.parent = parentEntity;
    }
    await this.categoryRepository.save(categoryEntity);
    const { parent: _parent, ..._category } = categoryEntity;
    return new DtoBuilder(CategoryDto).build({
      ..._category,
      parentId: _parent?.id,
    });
  }

  async delete(id: string) {
    const deleteResult = await this.categoryRepository.delete({
      id,
    });
    console.log(deleteResult);
    return id;
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryDto> {
    const categoryEntity = await this.categoryRepository.findOne({ id });
    const updateResult = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );
    return new DtoBuilder(CategoryDto).build({
      ...categoryEntity,
      ...updateCategoryDto,
    });
  }

  async findAll(): Promise<CategoryDto[]> {
    const categoryEntities = await this.categoryRepository.find();
    return new DtoBuilder(CategoryDto).build(categoryEntities);
  }

  async findPage(param) {
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
    return paginationBuilder.build(CategoryDto);
  }

  async findOne(id: string): Promise<CategoryDto> {
    const categoryEntity = await this.categoryRepository.findOne({ id });
    return new DtoBuilder(CategoryDto).build(categoryEntity);
  }

  async findById(id: string): Promise<CategoryEntity> {
    const categoryEntity = await this.categoryRepository.findOne({ id });
    return categoryEntity;
  }
}
