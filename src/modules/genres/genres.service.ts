import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './entities';

@Injectable()
export class GenresService {
    constructor(
        @InjectRepository(Genre) private readonly genresRepository: Repository<Genre>
    ) {}

    async findAll(type: string): Promise<Genre[]> {
        const query: SelectQueryBuilder<Genre> = this.genresRepository.createQueryBuilder('genres');

        if (type) {
            query.innerJoin('genres.movies', 'movies')
                .where('movies.type = :type', { type });
        }

        const genres: Genre[] = await query.getMany();

        if (!genres || !genres.length) {
            throw new BadRequestException('No genres found');
        }

        return genres;
    }
}
