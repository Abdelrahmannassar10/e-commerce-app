import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Model } from "mongoose";
import { Order } from "./order.schema";

export class OrderRepository extends AbstractRepository<Order>{
    constructor(@InjectModel(Order.name) private readonly orderModel:Model<Order>){
        super(orderModel);
    }
}