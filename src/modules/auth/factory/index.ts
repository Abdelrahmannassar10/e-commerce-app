import { generateOTP } from '@common/index';
import { RegisterDto } from '../dto/register.dto';
import { Customer } from '../entities/auth.entity';
import * as bcrypt from 'bcrypt';

export class AuthFactoryService {
  async createCustomer(registerDTO: RegisterDto) {
    const customer = new Customer();
    customer.userName = registerDTO.userName;
    customer.email = registerDTO.email;
    customer.password = await bcrypt.hash(registerDTO.password, 10);
    customer.dob = registerDTO.dob;
    customer.otp = generateOTP();
    customer.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    customer.isVerified =false
    return customer ;
  }
}
