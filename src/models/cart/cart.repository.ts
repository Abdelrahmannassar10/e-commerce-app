import { AbstractRepository } from "@models/abstract.repository";
import { Cart } from "./cart.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
@Injectable()
export class CartRepository extends AbstractRepository<Cart>{
    constructor(@InjectModel(Cart.name) private readonly cartModel:Model<Cart>){
        super(cartModel)
    }
}