import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@common/guards/auth.guard';
import { RolesGuard } from '@common/guards/roles.guard';
import { Public, Roles } from '@common/decorators';

@Controller('customer')
@UseGuards(AuthGuard)
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @Roles(["Admin",'Customer',"Seller"])
  @UseGuards(RolesGuard)
  @Public()
  getProfile(@Request()req :any ) {
    return {message:"dane", success:true,data:{user:req.user}};
  }

}
