import * as _ from 'lodash';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRO, CreateUserIO } from './dtos';
import { PasswordsHelper } from '@utils/helpers/passwords.helper';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) {}

    async create(user: CreateUserIO): Promise<UserRO> {
        const newUser: User = new User(user);
        newUser.password = await PasswordsHelper.hash(user.password);
        newUser.admin = false;

        await this.usersRepository.save(newUser);
        return _.omit(newUser, ['password']);
    }

    async findAll(): Promise<UserRO[]> {
        const users = await this.usersRepository.find();

        if (!users || !users.length) {
            throw new BadRequestException('No users found');
        }

        return users.map(user => _.omit(user, ['password']));
    }

    async findByID(id: number): Promise<UserRO> {
        const user = await this.usersRepository.findOne({
            where: { id }
        });

        if (!user) {
            throw new BadRequestException('User not found.');
        }

        return _.omit(user, ['password']);
    }

    async findByEmail(email: string, withPass: boolean = false): Promise<User> {
        let user: any = await this.usersRepository.findOne({
            where: { email }
        });

        if (!user) {
            return null;
        }

        if (!withPass) {
            user = _.omit(user, ['password']);
        }

        return user;
    }
}
