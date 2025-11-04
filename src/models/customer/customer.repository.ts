import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "../abstract.repository";
import { Model } from "mongoose";
import { Customer } from "./customer.schema";

export class CustomerRepository extends AbstractRepository<Customer>{
    constructor(@InjectModel(Customer.name) private readonly customerModel:Model<Customer>){
        super(customerModel);
    }
}