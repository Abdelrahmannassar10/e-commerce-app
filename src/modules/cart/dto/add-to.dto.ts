import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class AddToCartDTO {
  @IsMongoId()
  productId: Types.ObjectId;

  @IsNumber()
  @IsOptional()
  quantity: number;
}
