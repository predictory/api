import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities';

@Injectable()
export class MoviesService {
    constructor(
        @InjectRepository(Movie) private readonly moviesRepository: Repository<Movie>
    ) {}

    async findAll(take: number, skip: number, orderBy: string, order: 'ASC' | 'DESC', type: string, genre: string): Promise<Movie[]> {
        const query: SelectQueryBuilder<Movie> = this.moviesRepository
            .createQueryBuilder('movies')
            .leftJoinAndSelect('movies.genres', 'genres')
            .orderBy(`movies.${orderBy}`, order)
            .take(take)
            .skip(skip);

        if (type) {
            query.where('movies.type = :type', { type });
        }
        if (genre) {
            query.andWhere('LOWER(genres.name) = LOWER(:genre)', { genre });
        }

        const movies: Movie[] = await query.getMany();

        if (!movies || !movies.length) {
            throw new BadRequestException('No movies found');
        }

        return movies;
    }
}
