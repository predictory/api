import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class CreateUserIO {
    @IsString()
    @Length(1, 50)
    name: string;

    @IsString()
    @Length(1, 50)
    surname: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;
}
