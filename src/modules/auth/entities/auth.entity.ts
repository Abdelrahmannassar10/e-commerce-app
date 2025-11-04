import { Types } from 'mongoose';

export class Customer {
  readonly _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  dob: Date;
  isVerified: boolean;
  otp: string;
  otpExpiry: Date;
}
