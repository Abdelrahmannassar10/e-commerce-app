import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategoryRepository, categorySchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';
import { CategoryFactoryService } from './factory';

@Module({
  imports: [UserMongoModule,
    MongooseModule.forFeature([
      { name: Category.name, schema: categorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository,CategoryFactoryService],
  exports: [CategoryService, CategoryRepository,CategoryFactoryService],
})
export class CategoryModule {}
