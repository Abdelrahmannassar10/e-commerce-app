import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ForgetPasswordDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string
}