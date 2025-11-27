import { ProductCart } from "@models/index";
import { Types } from "mongoose";

export class Cart {
  readonly _id: Types.ObjectId;
  userId: Types.ObjectId;
  products: ProductCart[];
}
