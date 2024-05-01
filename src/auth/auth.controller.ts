import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'user/user.dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly prisma: PrismaService) {}

    @Post('login')
    async login(@Body() loginDto: UserDTO, @Res({ passthrough: true }) res: Response) {
        const user = await this.prisma.user.findUnique({
            where: {
                username: loginDto.username,
            },
        });
        if (user && (await bcrypt.compare(loginDto.password, user.password))) {
            const token = await this.authService.login(user);
            res.status(HttpStatus.OK);
            return token;
        } else {
            res.status(HttpStatus.NOT_ACCEPTABLE);
            return { message: 'Credenciais inválidas' };
        }
    }

    @Post('register')
    async register(@Body() registerDto: UserDTO, @Res({ passthrough: true }) res: Response) {
        const isExist = await this.prisma.user.findUnique({ where: { username: registerDto.username } });
        if (isExist) {
            res.status(HttpStatus.NOT_FOUND);
            return { message: 'Username already exist' };
        } else {
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);
            const user = (await this.prisma.user.create({
                data: {
                    username: registerDto.username,
                    password: hashedPassword,
                },
            })) as UserDTO;
            res.status(HttpStatus.CREATED);
            return { user, message: 'User registered successfully' };
        }
    }
}
