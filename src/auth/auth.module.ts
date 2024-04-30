import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your-jwt-secret',
            signOptions: { expiresIn: '60m' },
        }),
    ],
    providers: [AuthService, PrismaService],
    controllers: [AuthController],
})
export class AuthModule {}
