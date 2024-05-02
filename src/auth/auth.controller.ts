import { Controller, Post, Body, HttpStatus, Res, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from '../user/user.dto';
import { Response } from 'express';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthRequest } from './models/AuthRequest';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@IsPublic()

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly prisma: PrismaService) {}

    @Post('login')
    async login(@Body() loginDto: UserDTO, @Res({ passthrough: true }) res: Response, @Request() req: AuthRequest) {
        return await this.authService.login(loginDto);
    } 
}
