import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>
    ) {}

    async findAll(take: number, skip: number, orderBy: string, order: string): Promise<Movie[]> {
        const movies: Movie[] = await this.moviesRepository.find({
            take,
            skip,
            order: {
                [orderBy]: order
            }
        });

        if (!movies || !movies.length) {
            throw new BadRequestException('No movies found');
        }

        return movies;
    }
}
