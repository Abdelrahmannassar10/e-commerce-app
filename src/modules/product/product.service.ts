import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductRepository } from '@models/index';
import { CategoryService } from '@modules/category/category.service';
import { BrandService } from '@modules/brand/brand.service';
import { Types } from 'mongoose';
import { MESSAGE } from '@common/constant';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async create(product: Product, user: any) {
    //check category
    await this.categoryService.findOne(product.categoryId);
    //check brand
    await this.brandService.findOne(product.brandId);
    //update product if exist
    const productExist = await this.productRepository.getOne({
      slug: product.slug,
      $or: [{ createdBy: user._id }, { updatedBy: user._id }],
    });
    if (productExist) {
      return await this.update(productExist._id, product);
    }
    return await this.productRepository.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  async findOne(id: string | Types.ObjectId) {
    const productExist = await this.productRepository.getOne({ _id: id });
    if (!productExist) throw new NotFoundException(MESSAGE.Product.notFound);
    return productExist;
  }

  async update(id: string | Types.ObjectId, product: Product) {
    const productExist = await this.findOne(id);
    product.stock = +productExist.stock;
    //colors
    const colors = this.addToSet(productExist.colors, product.colors);
    product.colors = Array.from(colors);
    //sizes
    const sizes = this.addToSet(productExist.sizes, product.sizes);
    product.sizes = Array.from(sizes);
    //update
    return await this.productRepository.update(
      { _id: productExist._id },
      product,
      {
        new: true,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  addToSet(oldData: string[], newData: string[]) {
    const items = new Set<string>(oldData);
    for (const item of newData) {
      items.add(item);
    }
    return items;
  }
}
