import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async create(category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
    });
    if (categoryExist) throw new ConflictException('category already exist');
    const created = await this.categoryRepository.create(category);
    return created;
  }
  async update(id: string, category: Category) {
    const categoryExist = await this.categoryRepository.getOne({
      slug: category.slug,
      _id: { $ne: id },
    });
    if (categoryExist) throw new ConflictException('category already exist');
    return await this.categoryRepository.updateOne({ _id: id }, category, {
      new: true,
    });
  }
  async findOne(id: any) {
    const categoryExist = await this.categoryRepository.getOne(
      { _id: id },
      {},
      { populate: [{ path: 'createdBy' }, { path: 'updatedBy' }] },
    );
    if (!categoryExist) throw new NotFoundException('category not founded');
    return categoryExist;
  }
}
