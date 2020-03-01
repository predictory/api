import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Genre } from '@modules/genres/entities';

enum movieTypes {
    movie = 'movie',
    series = 'series',
    episode = 'episode'
}

@Entity({ name: 'movies' })
export class Movie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20 })
    imdbId: string;

    @Column({ length: 100 })
    title: string;

    @Column({ width: 4 })
    year: number;

    @Column({ length: 20 })
    rating: string;

    @Column('date')
    releaseDate: string;

    @ManyToMany(type => Genre, {
        cascade: true
    })
    @JoinTable({
        name: 'movies_genres',
        joinColumns: [
            {
                name: 'moviesId',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'genresId',
                referencedColumnName: 'id'
            }
        ]
    })
    genres: Genre[];

    @Column('enum', { enum: movieTypes })
    type: string;
}
