import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ConfirmEmailDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string 

    @IsString()
    @IsNotEmpty()
    otp:string
}