import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string;

    @IsString()
    @IsNotEmpty()
    otp:string;

    @IsString()
    @IsNotEmpty()
    newPassword:string;
}