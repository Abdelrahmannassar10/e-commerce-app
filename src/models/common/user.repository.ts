import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Model } from "mongoose";
import { User } from "./user.schema";

export class UserRepository extends AbstractRepository<User>{
    constructor(@InjectModel(User.name) private readonly userModel:Model<User>){
        super(userModel);
    }
}