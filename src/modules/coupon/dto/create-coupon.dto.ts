import { IsValidDate, IsValidDiscount } from '@common/decorators';
import { DiscountType } from '@common/types';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
  Length,
  MinDate,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 5)
  code: string;

  @IsValidDiscount()
  discountAmount: number;

  @IsString()
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate()
  @MinDate(new Date(Date.now() - 24 * 60 * 60 * 1000))
  fromDate: Date;
  
  @Transform(({ value }) => {
    return new Date(value);
  })
  @IsDate()
  @IsValidDate()
  toDate: Date;

  @IsBoolean()
  active: boolean;

  @IsArray()
  @IsMongoId({ each: true })
  assignedTo: Types.ObjectId[];
}
