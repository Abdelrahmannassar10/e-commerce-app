import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class Seller {
  userName: string;
  email: string;
  password: string;
  @Prop({ type: String, required: true })
  whatsAppLink: string;
}
export const sellerSchema = SchemaFactory.createForClass(Seller);
