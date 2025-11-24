import { Types } from 'mongoose';

export class Category {
  name: string;
  slug: string;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  //todo
  logo: Object;
}
