import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDTO } from './dto/add-to.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Auth, User } from '@common/decorators';
import { MESSAGE } from '@common/constant';

@Controller('cart')
@Auth(['Admin', 'Customer'])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() createCartDto: AddToCartDTO, @User() user: any) {
    const cart = await this.cartService.addToCart(createCartDto, user);
    return {
      success: true,
      message: MESSAGE.Cart.updated,
      data: cart,
    };
  }

  @Post('/remove/:productId')
  async removeFromCart(@Param('productId') productId: string, @User() user: any) {
    await this.cartService.removeFromCart(productId, user);
    return { success: true, message: MESSAGE.Cart.updated };
  }
}
