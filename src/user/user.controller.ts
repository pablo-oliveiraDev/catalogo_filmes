import { Controller, Get, Post, Patch, Delete, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { UserDTO } from './user.dto';
import { IsPublic } from 'auth/decorators/is-public.decorator';

@IsPublic()
@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    //Criar novos usuarios deve ser feito no register

    // Ler todos os usuários

    @Get()
    async findAll(@Res({ passthrough: true }) res: Response) {
        const user = await this.usersService.findAll();
        if (user) {
            res.status(HttpStatus.OK);
            return user;
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
            return { message: 'Internal server error!' };
        }
    }

    // Ler um usuário pelo ID

    @Get(':id')
    async findOne(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        const user = await this.usersService.findOne(id);
        if (user) {
            res.status(HttpStatus.OK);
            return user;
        } else {
            res.status(HttpStatus.NOT_FOUND);
            return { message: 'User not found' };
        }
    }

    @Post()
    async create(@Body() registerDto: UserDTO, @Res({ passthrough: true }) res: Response) {
        const isExist = await this.usersService.findUsername(registerDto);
        if (isExist) {
            res.status(HttpStatus.NOT_FOUND);
            return { message: 'Username already exist' };
        } else {
            const user = await this.usersService.create(registerDto);
            res.status(HttpStatus.CREATED);
            return { user, message: 'User registered successfully' };
        }
    }

    // Atualizar um usuário pelo ID

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body()
        updateUserDto: UserDTO,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = await this.usersService.update(+id, updateUserDto);
        if (user) {
            res.status(HttpStatus.OK);
            return { message: 'Update Successful', user };
        } else {
            res.status(HttpStatus.NOT_FOUND);
            return { message: 'User is not found!' };
        }
    }

    // Excluir um usuário pelo ID

    @Delete(':id')
    async delete(@Param('id') id: number, @Res({ passthrough: true }) res: Response) {
        const user = await this.usersService.delete(id);
        if (user) {
            res.status(HttpStatus.OK);
            return { message: 'User as deleted!' };
        } else {
            res.status(HttpStatus.BAD_REQUEST);
            return { message: 'Failed to delete user!' };
        }
    }
}
