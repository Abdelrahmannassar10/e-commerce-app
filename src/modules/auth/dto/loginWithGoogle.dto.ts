import { IsEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class loginWithGoogleDTO{
    @IsString()
    @IsNotEmpty()
    idToken:string
}