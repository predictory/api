import * as _ from 'lodash';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities';
import { UserRO } from './dtos';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) {}

    async findAll(): Promise<UserRO[]> {
        const users = await this.usersRepository.find();

        if (!users || !users.length) {
            throw new BadRequestException('No users found');
        }

        return users.map(user => _.omit(user, ['password']));
    }
}
