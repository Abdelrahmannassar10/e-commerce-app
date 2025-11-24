import { UserRepository } from '@models/common/user.repository';
import {
  Admin,
  AdminRepository,
  adminSchema,
  Customer,
  CustomerRepository,
  customerSchema,
  Seller,
  SellerRepository,
  sellerSchema,
  User,
  userSchema,
} from '@models/index';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Seller.name, schema: sellerSchema },
          { name: Admin.name, schema: adminSchema },
          { name: Customer.name, schema: customerSchema },
        ],
      },
    ]),
  ],
  providers: [AdminRepository, CustomerRepository, SellerRepository,UserRepository],
  exports: [AdminRepository, CustomerRepository, SellerRepository,UserRepository],
})
export class UserMongoModule {}
