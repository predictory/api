import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>
    ) {}

    async findAll(): Promise<Movie[]> {
        const movies: Movie[] = await this.moviesRepository.find();

        if (!movies || !movies.length) {
            throw new BadRequestException('No movies found');
        }

        return movies;
    }
}
