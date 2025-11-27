import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import {
  Order,
  OrderRepository,
  OrderSchema,
  ProductRepository,
} from '@models/index';
import { CartModule } from '@modules/cart/cart.module';
import { UserMongoModule } from '@shared/modules';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@modules/product/product.module';

@Module({
  imports: [
    CartModule,
    UserMongoModule,
    ProductModule,
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
