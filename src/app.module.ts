import { Module } from '@nestjs/common';
import { UsersService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
    imports: [AuthModule, FilmsModule],
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
})
export class AppModule {}
