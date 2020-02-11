import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginIO {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
