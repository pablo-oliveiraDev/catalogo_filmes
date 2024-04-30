import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Post()
    async create(
        @Body()
        createFilmDto: {
            title: string;
            description: string;
            releaseDate: Date;
            director: string;
        },
    ) {
        return this.filmsService.create(createFilmDto);
    }

    @Get()
    async findAll() {
        return this.filmsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.filmsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body()
        updateFilmDto: {
            title?: string;
            description?: string;
            releaseDate?: Date;
            director?: string;
        },
    ) {
        return this.filmsService.update(id, updateFilmDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.filmsService.delete(id);
    }
}
