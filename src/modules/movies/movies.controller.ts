import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    async findAll(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 0,
        @Query('orderBy') orderBy: string = 'id',
        @Query('order') order: 'ASC' | 'DESC' = 'ASC',
        @Query('type') type: string = null,
        @Query('genre') genre: string = null
    ): Promise<Movie[]> {
        return this.moviesService.findAll(take, skip, orderBy, order, type, genre);
    }
}
