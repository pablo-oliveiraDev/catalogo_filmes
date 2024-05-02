import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UnauthorizedError } from './errors/unarthorized.errors';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../user/user.dto';
import { UserToken } from './models/UserToken';
import { AuthPayloadDTO } from './models/authPayload';

jest.mock('bcrypt'); 
describe('AuthService', () => {
    let service: AuthService;
    let jwtService: JwtService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: JwtService, useValue: { sign: jest.fn() } },
                {
                    provide: PrismaService,
                    useValue: {
                        user: {
                            findUnique: jest.fn(),
                        },
                    },
                },
            ],
        }).compile();

        service = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    it('deve estar definido', () => {
        expect(service).toBeDefined();
    });

    describe('validateUser', () => {
        it('deve retornar um usuário válido quando credenciais corretas são fornecidas', async () => {
            const password = 'testpassword';
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = { id: 1, username: 'testuser', password: hashedPassword };

               (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);

            const result = await service.validateUser('testuser', password);

            expect(result).toEqual({ password, ...user });
            expect(bcrypt.compare).toHaveBeenCalledWith(password, user.password);
        });

        it('deve lançar UnauthorizedError para credenciais incorretas', async () => {
            const password = 'testpassword';
            const hashedPassword = await bcrypt.hash(password, 10);

            (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(service.validateUser('testuser', password)).rejects.toThrow(UnauthorizedError);
        });
    });

    describe('login', () => {
        it('deve retornar um token JWT para um usuário válido', async () => {
            const user = { id: 1, username: 'testuser', password: 'testpassword' };

            const token = 'mocked.jwt.token';
            (jwtService.sign as jest.Mock).mockReturnValue(token);

            const result = await service.login(user as UserDTO);

            expect(result).toEqual({ access_token: token });
            expect(jwtService.sign).toHaveBeenCalledWith({
                username: user.username,
                sub: user.id,
            });
        });
    });
});
