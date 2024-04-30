import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
    private prisma = new PrismaClient();

    // Criar um novo usuário
    async create(data: { name: string; email: string; password: string }) {
        return this.prisma.user.create({ data });
    }

    // Ler todos os usuários
    async findAll() {
        return this.prisma.user.findMany();
    }

    // Ler um usuário pelo ID
    async findOne(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    // Atualizar um usuário pelo ID
    async update(
        id: number,
        data: { name?: string; email?: string; password?: string },
    ) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    // Excluir um usuário pelo ID
    async delete(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
