import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from './errors/unarthorized.errors';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'user/user.dto';
import { AuthPayloadDTO } from './models/authPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) {}

    async validateUser(username: string, password: string): Promise<UserDTO> {
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
           const result ={ password, ...user }
            return result;
        }
        throw new UnauthorizedError('Username or password provided is incorrect.');
    }

    async login(user: UserDTO): Promise<UserToken> {
        const payload: AuthPayloadDTO = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
