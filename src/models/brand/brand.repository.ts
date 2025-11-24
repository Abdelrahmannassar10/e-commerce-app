import { AbstractRepository } from "@models/abstract.repository";
import { Brand } from "./brand.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
@Injectable()
export class BrandRepository extends AbstractRepository<Brand>{
    constructor(@InjectModel(Brand.name) private readonly brandModel:Model<Brand>){
        super(brandModel)
    }
}