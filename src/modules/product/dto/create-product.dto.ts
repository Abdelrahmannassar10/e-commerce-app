import { DiscountType } from '@common/types';
import { IsArray, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  //=====strings
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description: string;
  //==========ids
  @IsMongoId()
  @IsNotEmpty()
  categoryId: Types.ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  brandId: Types.ObjectId;
  //=====numbers
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  discountAmount: number;

  @IsEnum(DiscountType)
  @IsString()
  @IsOptional()
  discountType: DiscountType;

  @IsNumber()
  @IsOptional()
  stock: number;
  //===========specifications
  @IsArray()
  @IsString({each:true})
  colors: string[];

  @IsArray()
  @IsString({each:true})
  sizes: string[];
}
