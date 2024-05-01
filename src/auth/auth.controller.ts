import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from 'user/user.dto';
import { response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly prisma: PrismaService) {}

    @Post('login')
    async login(@Body() loginDto: UserDTO) {
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (user) {
            return await this.authService.login(user);
        }
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    @Post('register')
    async register(@Body() registerDto: UserDTO) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = (await this.prisma.user.create({
            data: {
                username: registerDto.username,
                password: hashedPassword,
            },
        })) as UserDTO;
        return response.status(202).json({ user, message: 'User registered successfully' });
    }
}
