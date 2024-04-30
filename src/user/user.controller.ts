import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
} from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Criar um novo usuário
    @Post()
    async create(
        @Body()
        createUserDto: {
            name: string;
            email: string;
            password: string;
        },
    ) {
        return this.usersService.create(createUserDto);
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
        updateUserDto: { name?: string; email?: string; password?: string },
    ) {
        return this.usersService.update(id, updateUserDto);
    }

    // Excluir um usuário pelo ID
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}
