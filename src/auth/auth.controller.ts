import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly prisma: PrismaService,
    ) {}

    @Post('login')
    async login(@Body() loginDto: any) {
        const user = await this.authService.validateUser(
            loginDto.username,
            loginDto.password,
        );
        if (user) {
            return await this.authService.login(user);
        }
        throw new Error('Invalid credentials');
    }

    @Post('register')
    async register(@Body() registerDto: any) {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: registerDto.useername,                
                password: hashedPassword,
            },
        });
        return { message: 'User registered successfully' };
    }
}
