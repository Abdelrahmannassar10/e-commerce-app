import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class Customer {
  userName: string;
  email: string;
  password: string;
  otp:string;
  otpExpiry:Date;
  isVerified:boolean;
  @Prop({ type: Date})
  dob: Date;
  role :string
}
export const customerSchema = SchemaFactory.createForClass(Customer);
