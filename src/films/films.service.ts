import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FilmsDTO, updateFilmsDTO } from './films.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FilmsService {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: FilmsDTO) {
        return this.prisma.film.create({ data });
    }

    async findAll() {
        return await this.prisma.film.findMany();
    }
    async isExist(data: Partial<FilmsDTO>) {
        return await this.prisma.film.findFirst({where:{title:data.title}})
    }

    async findOne(id: number) {
        return this.prisma.film.findUnique({ where: { id } });
    }

    async update(id: number, data: updateFilmsDTO) {
        return await this.prisma.film.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                releaseDate: data.releaseDate,
                director: data.director,
            },
        });
    }

    async delete(id: number) {
        return await this.prisma.film.delete({ where: { id } });
    }
}
