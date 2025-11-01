import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class User {
  @Prop({ type: String, required: true })
  userName: string;
  @Prop({ type: String, required: true ,unique:true})
  email: string;
  @Prop({ type: String, required: true })
  password: string;
};
export const userSchema = SchemaFactory.createForClass(User);
