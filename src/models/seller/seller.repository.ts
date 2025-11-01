import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Seller } from "./seller.schema";
import { Model } from "mongoose";

export class SellerRepository extends AbstractRepository<Seller>{
    constructor(@InjectModel(Seller.name) sellerModel:Model<Seller>){
        super(sellerModel);
    }
}