import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class Admin {
  userName: string;
  email: string;
  password: string;
}
export const adminSchema = SchemaFactory.createForClass(Admin);
