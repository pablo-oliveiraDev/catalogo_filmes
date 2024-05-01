import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    // Criar um novo usuário
    async create(data: UserDTO) {
        const user = await this.prisma.user.create({ data });
        return user;
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
    async update(id: number, data: UserDTO) {
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
