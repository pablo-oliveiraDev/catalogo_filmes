import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../jwt/jwt-guard';
import { UseGuards } from '@nestjs/common';

@Controller('films')
@UseGuards(JwtAuthGuard)
export class FilmsController {
    constructor(
        private readonly moviesService: FilmsService,
        private readonly prisma: PrismaService,
    ) {}

    @Get()
    async getAll() {
        return this.prisma.film.findMany();
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        return this.prisma.film.findUnique({ where: { id } });
    }

    @Post()
    async create(@Body() createDto: any) {
        return this.prisma.film.create({
            data: createDto,
        });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateDto: any) {
        return this.prisma.film.update({
            where: { id },
            data: updateDto,
        });
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.prisma.film.delete({
            where: { id },
        });
    }
}
