import { Controller, Get, Query } from '@nestjs/common';
import { GenresService } from './genres.service';
import { Genre } from './entities';

@Controller('genres')
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Get()
    async findAll(@Query('type') type: string = null): Promise<Genre[]> {
        return this.genresService.findAll(type);
    }
}
