import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, PrismaService],
})
export class UserModule {}
