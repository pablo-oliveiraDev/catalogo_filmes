import { Module } from '@nestjs/common';
import { UsersService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from 'user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { FilmsService } from 'films/films.service';

@Module({
    imports: [AuthModule, FilmsModule, UserModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        FilmsService,
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
})
export class AppModule {}
