import { Controller, Get, Post, Put, Delete, Body, Param, Patch, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { FilmsService } from './films.service';
import { PrismaService } from '../prisma/prisma.service';


import { ApiTags } from '@nestjs/swagger';
import { FilmsDTO, updateFilmsDTO } from './films.dto';


@ApiTags('films')
@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) {}

    @Get()
    async getAll(@Res({ passthrough: true }) res: Response) {
        const films = await this.filmsService.findAll();
        if (films) {
            res.status(HttpStatus.OK);
            return films;
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            throw new Error('Server error');
        }
    }

    @Get(':id')
    async getOne(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        if (id) {
            const films = await this.filmsService.findOne(+id);
            if (films) {
                res.status(HttpStatus.OK);
                return films;
            } else {
                res.status(HttpStatus.NOT_FOUND);
                return { message: 'Film not found' };
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST);
            return { message: 'id is not null!' };
        }
    }

    @Post()
    async create(@Body() createDto: FilmsDTO, @Res({ passthrough: true }) res: Response) {
        const films = await this.filmsService.create(createDto);
        if (films) {
            res.status(HttpStatus.CREATED);
            return { message: 'Created Successfully!', films };
        } else {
            res.status(HttpStatus.BAD_REQUEST);
            return { message: 'Error on creating film' };
        }
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateDto: updateFilmsDTO, @Res({ passthrough: true }) res: Response) {
        if (id) {
            const isExist = await this.filmsService.findOne(id);
            if (isExist) {
                const film = await this.filmsService.update(+id, updateDto);
                res.status(HttpStatus.OK);
                return { message: 'User update  successful!', film };
            } else {
                res.status(HttpStatus.NOT_FOUND);
                return { message: 'This user does not exist!' };
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST);
            return { message: 'Field id does not null!' };
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        if (id) {
            const isExist = await this.filmsService.findOne(id);
            if (isExist) {
                const film = await this.filmsService.delete(+id);
                res.status(HttpStatus.OK);
                return { message: 'User deleted!', film };
            } else {
                res.status(HttpStatus.NOT_FOUND);
                return { message: 'This user does not exist!' };
            }
        } else {
            res.status(HttpStatus.BAD_REQUEST);
            return { message: 'Field id does not null!' };
        }
    }
}
