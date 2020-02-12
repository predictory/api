import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { MoviesModule } from '@modules/movies/movies.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { LoggerModule } from '@modules/logger/logger.module';
import { consoleTransport, fileTransport } from '@modules/logger/transports';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        WinstonModule.forRoot({
            transports: [
                consoleTransport,
                fileTransport
            ]
        }),
        LoggerModule,
        MoviesModule,
        UsersModule,
        AuthModule
    ]
})
export class AppModule {}
