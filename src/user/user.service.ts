import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from './user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

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
        return await this.prisma.user.findMany();
    }

    // Ler um usuário pelo ID
    async findOne(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    // Atualizar um usuário pelo ID
    async update(id: number, data: UserDTO) {
        let hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.user.update({
            where: { id },
            data:{
                username: data.username,
                password:hashedPassword
            },
        });
    }

    // Excluir um usuário pelo ID
    async delete(id: number) {
        return await this.prisma.user.delete({ where: { id } });
    }
}
