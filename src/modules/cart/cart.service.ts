import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDTO } from './dto/add-to.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ProductService } from '@modules/product/product.service';
import { CartRepository } from '@models/index';
import { MESSAGE } from '@common/constant';
import { Types } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    private readonly productService: ProductService,
    private readonly cartRepository: CartRepository,
  ) {}
  async createCart(addToCartDto: AddToCartDTO, user: any) {
    const cart = await this.cartRepository.create({
      userId: user._id,
      products: [
        {
          productId: addToCartDto.productId,
          quantity: addToCartDto.quantity,
        },
      ],
    });
    return cart;
  }
  async addToCart(addToCartDto: AddToCartDTO, user: any) {
    await this.productService.findOne(addToCartDto.productId);
    const cart = await this.cartRepository.getOne({userId:user._id});
    if (!cart) {
      return await this.createCart(addToCartDto, user);
    }
    const index = cart.products.findIndex((product) => {
      return product.productId.equals(addToCartDto.productId);
    });

    if (index === -1) {
      cart.products.push({
        productId: addToCartDto.productId,
        quantity: addToCartDto.quantity,
      });
    } else {
      if (addToCartDto.quantity === 0) {
        return await this.removeFromCart(addToCartDto.productId, user);
      }
      cart.products[index].quantity = addToCartDto.quantity;
    }
    await cart.save();
    return cart;
  }
  async removeFromCart(productId: string | Types.ObjectId, user: any) {
    const product = await this.cartRepository.update(
      { userId: user._id, 'products.productId': productId },
      { $pull: { products: { productId } } },
    );
    if (!product) throw new NotFoundException(MESSAGE.Product.notFound);
    return true;
  }
  async clearCart(user: any) {
    return await this.cartRepository.update(
      { userId: user._id },
      { $pull: { products: [] } },
    );
  }
  async findOne(user: any) {
     const cart = await this.cartRepository.getOne({ userId: user._id });
    if (!cart) throw new NotFoundException(MESSAGE.Cart.notFound);
    return cart;
  }
  
}
