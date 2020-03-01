import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Genre } from '@modules/genres/entities';
import { Actor, Country, Language, PortalRating } from './';

export enum movieTypes {
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

    @Column('enum', { enum: movieTypes })
    type: string;

    @Column({ length: 100 })
    director: string;

    @Column('text')
    plot: string;

    @Column({ length: 255 })
    poster: string;

    @Column({ length: 100 })
    production: string;

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

    @ManyToMany(type => Actor, {
        cascade: true
    })
    @JoinTable({
        name: 'movies_actors',
        joinColumns: [
            {
                name: 'moviesId',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'actorsId',
                referencedColumnName: 'id'
            }
        ]
    })
    actors: Actor[];

    @ManyToMany(type => Language, {
        cascade: true
    })
    @JoinTable({
        name: 'movies_languages',
        joinColumns: [
            {
                name: 'moviesId',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'languagesId',
                referencedColumnName: 'id'
            }
        ]
    })
    languages: Language[];

    @ManyToMany(type => Country, {
        cascade: true
    })
    @JoinTable({
        name: 'movies_countries',
        joinColumns: [
            {
                name: 'moviesId',
                referencedColumnName: 'id'
            }
        ],
        inverseJoinColumns: [
            {
                name: 'countriesId',
                referencedColumnName: 'id'
            }
        ]
    })
    countries: Country[];

    @OneToMany(type => PortalRating, rating => rating.movie, {
        cascade: true
    })
    portalRatings: PortalRating[];
}
