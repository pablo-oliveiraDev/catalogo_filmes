import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class FilmsService {
    private prisma = new PrismaClient();

    async create(data:any) {
        return this.prisma.film.create({ data });
    }

    async findAll() {
        return this.prisma.film.findMany();
    }

    async findOne(id: number) {
        return this.prisma.film.findUnique({ where: { id } });
    }

    async update(
        id: number,
        data: {
            title?: string;
            description?: string;
            releaseDate?: Date;
            director?: string;
        },
    ) {
        return this.prisma.film.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return this.prisma.film.delete({ where: { id } });
    }
}
