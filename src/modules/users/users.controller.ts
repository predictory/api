import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { CurrentUser } from './current-user.decorator';
import { AdminGuard } from '@modules/auth/admin.guard';
import { UserRO } from './dtos';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async findAll(): Promise<UserRO[]> {
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async currentUser(@CurrentUser() currentUser): Promise<UserRO> {
        return this.usersService.findByID(currentUser.id);
    }
}
