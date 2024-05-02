import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { UserModule } from 'user/user.module';

@Module({
    imports: [
        UserModule,
        PassportModule, // Registra a estratégia JWT
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '30d' },
        }),
    ],
    providers: [AuthService, PrismaService, JwtStrategy, LocalStrategy], // Inclua JwtStrategy nos provedores
    controllers: [AuthController],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoginValidationMiddleware).forRoutes('login');
    }
}
