import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginIO } from './dtos';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginData: LoginIO) {
        return this.authService.login(loginData);
    }
}
