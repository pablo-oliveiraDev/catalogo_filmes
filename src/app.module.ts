import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './user/user.service';
import { UsersController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { FilmsModule } from './films/films.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, FilmsModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}
