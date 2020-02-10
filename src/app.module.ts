import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from '@modules/movies/movies.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        MoviesModule,
        UsersModule
    ]
})
export class AppModule {}
