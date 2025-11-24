import { AbstractRepository } from "@models/abstract.repository";
import { Category } from "./category.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export class CategoryRepository extends AbstractRepository<Category>{
    constructor(@InjectModel(Category.name )private readonly categoryModel:Model<Category>){
        super(categoryModel)
    }
}