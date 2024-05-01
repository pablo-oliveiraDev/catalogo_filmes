import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'user/user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.findUnique({
            where: {
                username: username,
                AND: {
                    password: hashedPassword,
                },
            },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        } else {
            return { message: 'user is no found!' };
        }
    }

    async login(user: UserDTO) {
        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
