import * as config from 'config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '@modules/users/users.module';

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: config.get('jwtSecret'),
            signOptions: {
                expiresIn: 3600
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
