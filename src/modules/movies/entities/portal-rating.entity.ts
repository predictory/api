import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';

@Entity({ name: 'ratings' })
export class PortalRating {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    source: string;

    @Column({
        length: 10
    })
    value: string;

    @ManyToOne(type => Movie, movie => movie.portalRatings)
    movie: Movie;
}
