import { DiscountType } from '@common/types';
import { Types } from 'mongoose';

export class Product {
  readonly _id: Types.ObjectId;
  //=====strings
  name: string;
  slug: string;
  description: string;
  //==========ids
  categoryId: Types.ObjectId;
  brandId: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  //=====numbers
  price: number;
  discountAmount: number;
  discountType: DiscountType;
  finalPrice: number; //==== virtual
  stock: number;
  sold: number;
  //===========specifications
  colors: string[];
  sizes: string[];
}
