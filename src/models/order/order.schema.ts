import { OrderStatus, PaymentMethod } from '@common/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
class OrderProduct {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId;
  @Prop({ type: Number, required: true })
  quantity: number;
  @Prop({ type: Number, required: true })
  price: number;
  @Prop({ type: Number, required: true })
  discount: number;
  @Prop({ type: Number, required: true })
  totalPrice: number;
}
@Schema()
class Address {
  @Prop({ type: String, required: true })
  street: string;
  @Prop({ type: String, required: true })
  city: string;
  @Prop({ type: String, required: true })
  state: string;
  @Prop({ type: String, required: true })
  country: string;
  @Prop({ type: String, required: true })
  code: string;
  @Prop({ type: Number, required: true })
  phoneNumber: string;
}
@Schema()
class CouponDetails {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Coupon', required: true })
  couponId: Types.ObjectId;
  @Prop({ type: Number, required: true })
  discountAmount: number;
  @Prop({ type: String, required: true })
  code: string;
}

@Schema({ timestamps: true })
export class Order {
  readonly _id: Types.ObjectId;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ type: Address, required: true })
  address: Address;
  @Prop({ type: [OrderProduct], required: true })
  products: OrderProduct[];
  @Prop({ type: String, enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod: PaymentMethod;
  @Prop({ type: String, enum: OrderStatus, default: function(){
    if(this.paymentMethod === PaymentMethod.COD){
      return OrderStatus.PLACED;
    }
    return OrderStatus.PENDING;
  } })
  status: OrderStatus;
  @Prop({ type: CouponDetails })
  coupon: CouponDetails;
  @Prop({ type: Number, required: true })
  totalAmount: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
