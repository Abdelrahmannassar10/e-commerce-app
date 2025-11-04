import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthFactoryService } from './factory';
import { LoginDTO } from './dto/login.dto';
import { ConfirmEmailDTO } from './dto/confirm-email.dto';
import { ForgetPasswordDTO } from './dto/Forget-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { loginWithGoogleDTO } from './dto/loginWithGoogle.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authFactoryService: AuthFactoryService,
  ) {}

  @Post('/register')
  async register(@Body() registerDTO: RegisterDto) {
    const customer = await this.authFactoryService.createCustomer(registerDTO);
    const createdCustomer = await this.authService.register(customer);
    return {
      Message: 'customer created successfully',
      success: true,
      data: createdCustomer,
    };
  }
  @Post('/login')
  async login(@Body() loginDTO: LoginDTO) {
    const { token, userExist } = await this.authService.login(loginDTO);
    return {
      message: 'login successfully',
      success: true,
      data: { token, userExist },
    };
  }
  @Post('/confirm-email')
  async confirmEmail(@Body() confirmEmailDto: ConfirmEmailDTO) {
    const user = await this.authService.confirmEmail(confirmEmailDto);
    return {
      message: 'user updated successfully',
      success: true,
      data: { user },
    };
  }
  @Post('/forget-password')
  async forgetPassword(@Body() forgetPasswordDTO: ForgetPasswordDTO) {
    const user = await this.authService.forgetPassword(forgetPasswordDTO);
    return { message: 'otp sent successfully', success: true, data: { user } };
  }
  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    const user = await this.authService.resetPassword(resetPasswordDTO);
    return {
      message: 'password updated successfully',
      success: true,
      data: { user },
    };
  }
  @Post('/loginWithGoogle')
  async loginWithGoogle(@Body() loginWithGoogleDTO: loginWithGoogleDTO) {
    const token = await this.authService.loginWithGoogle(loginWithGoogleDTO);
    return {
      message: 'login successfully',
      success: true,
      data: { token },
    };
  }
}
