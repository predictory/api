import * as _ from 'lodash';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces';
import { UsersService } from '@modules/users/users.service';
import { User } from '@modules/users/entities';
import { PasswordsHelper } from '@utils/helpers/passwords.helper';
import { LoginIO } from './dtos';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validate(data: JwtPayload): Promise<User> {
        return await this.usersService.findByEmail(data.email);
    }

    async login(data: LoginIO): Promise<{ accessToken, expiresIn }> {
        const user: User = await this.findByEmailAndPass(data);

        if (user) {
            const sanitizedUser = _.omit(user, ['password']);
            const accessToken = this.jwtService.sign(sanitizedUser);

            return {
                accessToken,
                expiresIn: 3600
            };
        }

        throw new BadRequestException('User with given credentials not found.');
    }

    async findByEmailAndPass(data: LoginIO): Promise<User> {
        let user: User = await this.usersService.findByEmail(data.email, true);

        if (user) {
            const valid = await PasswordsHelper.compare(data.password, user.password);

            if (!valid) {
                user = null;
            }
        }

        return user;
    }
}
