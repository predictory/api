import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesService {
    async findAll(): Promise<any> {
        return 'This action returns all movies';
    }
}
