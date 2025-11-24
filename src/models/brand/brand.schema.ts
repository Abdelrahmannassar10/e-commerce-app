import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
@Schema({timestamps:true})
export class Brand {
  readonly _id: Types.ObjectId;
  @Prop({ type: String, trim: true, required: true, unique: true })
  name: string;

  @Prop({ type: String, trim: true, required: true, unique: true })
  slug: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Admin' })
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: 'Admin' })
  updatedBy: Types.ObjectId;
  logo: Object;
}
export const brandSchema =SchemaFactory.createForClass(Brand);