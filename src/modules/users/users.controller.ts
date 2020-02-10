import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRO } from './dtos';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<UserRO[]> {
        return this.usersService.findAll();
    }
}
