import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from '@shared/index';
import { ProductFactoryService } from './factory/product.factory';
import { Product, ProductRepository, productSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '@modules/category/category.module';
import { BrandModule } from '@modules/brand/brand.module';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    CategoryModule,
    BrandModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductFactoryService, ProductRepository],
  exports:[ProductService,ProductRepository]
})
export class ProductModule {}
