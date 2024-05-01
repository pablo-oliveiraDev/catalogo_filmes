import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { UserDTO } from './user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Criar um novo usuário

    @Post()
    async create(@Body() data: UserDTO): Promise<{ id: number; username: string; password: string }> {
        return this.usersService.create(data);
    }

    // Ler todos os usuários

    @Get()
    async findAll() {
        return this.usersService.findAll();
    }

    // Ler um usuário pelo ID

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    // Atualizar um usuário pelo ID

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body()
        updateUserDto: UserDTO,
    ) {
        return this.usersService.update(+id, updateUserDto);
    }

    // Excluir um usuário pelo ID

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}
