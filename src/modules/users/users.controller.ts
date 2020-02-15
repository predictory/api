import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CurrentUser } from './current-user.decorator';
import { AdminGuard } from '@modules/auth/admin.guard';
import { UserRO, CreateUserIO } from './dtos';
import { User } from '@modules/users/entities';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async findAll(): Promise<UserRO[]> {
        return this.usersService.findAll();
    }

    @Post()
    async createUser(@Body() data: CreateUserIO) {
        return this.usersService.create(data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async currentUser(@CurrentUser() currentUser): Promise<UserRO> {
        return this.usersService.findByID(currentUser.id);
    }
}
