import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { UserMongoModule } from '@shared/index';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[UserMongoModule],
  controllers: [CustomerController],
  providers: [CustomerService ,JwtService],
})
export class CustomerModule {}
