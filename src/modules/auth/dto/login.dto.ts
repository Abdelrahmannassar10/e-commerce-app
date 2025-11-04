import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class LoginDTO{
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}