import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

import { Response } from 'express';
import { AuthRequest } from './models/AuthRequest';
import { UserDTO } from '../user/user.dto';

describe('AuthController', () => {
    let controller: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: { login: jest.fn() } },
                { provide: PrismaService, useValue: {} },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('login', () => {
        it('deve retornar um token JWT quando um usuário válido faz login', async () => {
            const loginDto: UserDTO = { username: 'testuser', password: 'testpassword' };
            const mockedToken = { access_token: 'mocked.jwt.token' };

            // Mockar a função `login` do AuthService
            (authService.login as jest.Mock).mockResolvedValue(mockedToken);

            // Criar um mock para a resposta HTTP
            const res = {
                json: jest.fn(),
            } as unknown as Response;

            // Criar um mock para a requisição HTTP
            const req = {
                user: null, // Se o `AuthRequest` tem outros campos, preencha-os conforme necessário
            } as AuthRequest;

            const result = await controller.login(loginDto, res, req);

            expect(authService.login).toHaveBeenCalledWith(loginDto);
            expect(result).toEqual(mockedToken);
        });
    });
});
