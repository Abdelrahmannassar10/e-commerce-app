import { CreateCouponDto } from '../dto/create-coupon.dto';
import { Coupon } from '../entities/coupon.entity';

export class CouponFactoryService {
  createCoupon(createCouponDto: CreateCouponDto, user: any) {
    const coupon = new Coupon();
    coupon.code = createCouponDto.code;
    coupon.discountType = createCouponDto.discountType;
    coupon.discountAmount = createCouponDto.discountAmount;
    coupon.active = createCouponDto.active;
    coupon.assignedTo = createCouponDto.assignedTo.map((id) => ({
      customerId: id,
      count: 0,
    }));
    coupon.createdBy = user._id;
    coupon.updatedBy = user._id;
    coupon.fromDate = createCouponDto.fromDate;
    coupon.toDate = createCouponDto.toDate;
    coupon.usedBy = [];
    return coupon;
  }
}
