import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { PrismaService } from '../prisma/prisma.service'; 
@Module({
    imports: [],
    controllers: [FilmsController],
    providers: [FilmsService, PrismaService], // Adicione o PrismaService aos providers
})
export class FilmsModule {}
