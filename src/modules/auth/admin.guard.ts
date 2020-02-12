import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { User } from '@modules/users/entities';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user: User = request.user;
        return user.admin;
    }
}
