import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import slugify from 'slugify';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryFactoryService {
  constructor(private readonly categoryRepository:CategoryRepository){}
  createCategory(createCategoryDto: CreateCategoryDto, user: any) {
    const category = new Category();
    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      replacement: '-',
      trim: true,
      lower:true
    });
    category.createdBy=user._id;
    category.updatedBy=user._id;
    category.logo=createCategoryDto.logo;
    return category ;
  };
  async updateCategory(updateCategoryDto: UpdateCategoryDto, id: any,user:any) {
    console.log(id);
    
    const oldCategory = await this.categoryRepository.getOne({_id:id});
    console.log(oldCategory);
    
    if(!oldCategory) throw new NotFoundException("category not founded");
    const category = new Category();
    const newName = updateCategoryDto.name || oldCategory.name
    category.name = newName;
    category.slug = slugify(newName, {
      replacement: '-',
      trim: true,
      lower:true
    });
    category.logo=updateCategoryDto.logo || oldCategory.logo;
    category.updatedBy=user._id;
    return category ;
  }
}
