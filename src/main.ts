import * as config from 'config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
    const host: string = config.get('api.host');
    const port: number = config.get('api.port');

    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe({
        transform: true
    }));
    await app.listen(port, host);
}
bootstrap();
