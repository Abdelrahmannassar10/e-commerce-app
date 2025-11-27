import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CartService } from '@modules/cart/cart.service';
import { OrderRepository, ProductRepository } from '@models/index';
import { Types } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: any) {
    const cart = await this.cartService.findOne(user);
    const failProducts: { productId: Types.ObjectId; reason: string }[] = [];
    const successProducts: {
      productId: Types.ObjectId;
      quantity: number;
      price: number;
      discount: number;
      totalPrice: number;
    }[] = [];
    for (const product of cart.products) {
      const productExist = await this.productRepository.getOne({
        _id: product.productId,
      });
      if (!productExist) {
        failProducts.push({
          productId: product.productId,
          reason: 'Product not found',
        });
        continue;
      }
      if (productExist.stock < product.quantity) {
        failProducts.push({
          productId: product.productId,
          reason: 'Product stock not enough',
        });
        continue;
      }
      successProducts.push({
        productId: product.productId,
        quantity: product.quantity,
        discount: productExist.discountAmount,
        price: productExist.finalPrice,
        totalPrice: productExist.finalPrice * product.quantity,
      });
    }
    if (failProducts.length > 0) {
      return failProducts;
    }
    //create product
    const order = await this.orderRepository.create({
      userId:user._id,
      address: createOrderDto.address,
      coupon: createOrderDto.couponDetails,
      paymentMethod: createOrderDto.paymentMethod,
      products: successProducts,
      totalAmount: successProducts.reduce(
        (acc, cur) => acc + cur.totalPrice,
        0,
      ),
    });
    return order ;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
