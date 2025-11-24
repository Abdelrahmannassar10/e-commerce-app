import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Customer } from './entities/auth.entity';
import { generateOTP, sendMail } from '@common/helper';
import { ConfigService } from '@nestjs/config';
import { LoginDTO } from './dto/login.dto';
import { UserRepository } from '@models/common/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfirmEmailDTO } from './dto/confirm-email.dto';
import { ForgetPasswordDTO } from './dto/Forget-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { loginWithGoogleDTO } from './dto/loginWithGoogle.dto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  // @UseFilters(HttpExceptionFilter)
  async register(customer: Customer) {
    const userExist = await this.userRepository.getOne({
      email: customer.email,
    });
    if (userExist) throw new ConflictException('customer is already exist');
    const createdUser = await this.userRepository.create(customer);
    await sendMail({
      to: customer.email,
      subject: 'confirm email',
      html: this.configService.get('OTP_Body').body(customer.otp),
    });
    const { password, otp, otpExpiry, ...createdObj } = JSON.parse(
      JSON.stringify(createdUser),
    );
    return createdObj as Customer;
  }
  async login(loginDTO: LoginDTO) {
    const userExist = await this.userRepository.getOne({
      email: loginDTO.email,
    });
    const match = await bcrypt.compare(
      loginDTO.password,
      userExist?.password || '',
    );
    if (!userExist) throw new UnauthorizedException('invalid credential');
    if (!match) throw new UnauthorizedException('invalid credential');
    if (userExist.isVerified == false) {
      throw new UnauthorizedException('user is not verified ');
    }
    const token = this.jwtService.sign(
      {
        _id: userExist.id,
        role: userExist.role,
        email: userExist.email,
      },
      { secret: this.configService.get('access').jwt_secret, expiresIn: '1d' },
    );
    return { token, userExist };
  }
  async confirmEmail(confirmEmail: ConfirmEmailDTO) {
    const userExist = await this.userRepository.getOne({
      email: confirmEmail.email,
    });
    if (!userExist) throw new NotFoundException('user not founded');
    if (confirmEmail.otp != userExist.otp) {
      throw new ConflictException('invalid otp');
    }
    if (userExist.otpExpiry < new Date()) {
      throw new ConflictException('invalid otp');
    }
    const user = await this.userRepository.updateOne(
      { email: userExist.email },
      { $unset: { otp: '', otpExpiry: '' }, $set: { isVerified: true } },
    );
    return user;
  }
  async forgetPassword(forgetPasswordDTO: ForgetPasswordDTO) {
    const userExist = await this.userRepository.getOne({
      email: forgetPasswordDTO.email,
    });
    if (!userExist) throw new NotFoundException('user not found ');
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await sendMail({
      to: userExist.email,
      subject: 'reset  password',
      html: this.configService.get('OTP_Body').body(otp),
    });
    await this.userRepository.updateOne(
      { email: userExist.email },
      { $set: { otp: otp, otpExpiry: otpExpiry } },
    );
    return userExist;
  }
  async resetPassword(resetPasswordDTO: ResetPasswordDTO) {
    const userExist = await this.userRepository.getOne({
      email: resetPasswordDTO.email,
    });
    if (!userExist) throw new NotFoundException('user not found');
    if (resetPasswordDTO.otp != userExist.otp) {
      throw new ConflictException('invalid otp');
    }
    if (userExist.otpExpiry < new Date()) {
      throw new ConflictException('invalid otp');
    }
    const hashedPassword = await bcrypt.hash(resetPasswordDTO.newPassword, 10);
    await this.userRepository.update(
      { email: resetPasswordDTO.email },
      {
        $set: { password: hashedPassword },
        $unset: { otp: '', otpExpiry: '' },
      },
    );
    return userExist;
  }
  async loginWithGoogle(loginWithGoogleDTO: loginWithGoogleDTO) {
    const { idToken } = loginWithGoogleDTO;
    const client = new OAuth2Client(this.configService.get('GOOGLE_CLIENT_ID'));

    const ticket = await client.verifyIdToken({
      idToken,
      audience: this.configService.get('GOOGLE_CLIENT_ID'),
    });

    const payload = ticket.getPayload();
    if (!payload) throw new ConflictException('Invalid Google token');

    const existingUser = await this.userRepository.getOne({
      email: payload.email,
    });

    const user =
      existingUser ??
      (await this.userRepository.create({
        email: payload.email,
        userName: payload.name,
        isVerified: true,
      }));

    const token = this.jwtService.sign(
      {
        _id: user.id,
      },
      {
        secret: this.configService.get('access').jwt_secret,
        expiresIn: '1d',
      },
    );

    return token;
  }
}
