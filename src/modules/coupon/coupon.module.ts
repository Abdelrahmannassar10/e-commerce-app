import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { UserMongoModule } from '@shared/modules';
import { CouponFactoryService } from './factory/coupon.factory';
import { Coupon, CouponRepository, couponSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Coupon.name, schema: couponSchema }]),
  ],
  controllers: [CouponController],
  providers: [CouponService, CouponFactoryService, CouponRepository],
})
export class CouponModule {}
