import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt'); // Mock para o bcrypt para simular o comportamento de hash de senha

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: {
          user: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        }},
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo usuário com senha hash', async () => {
      const userDto: UserDTO = {
        username: 'newuser',
        password: 'password123',
      };

      const hashedPassword = 'hashed_password';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const mockUser = {
        id: 1,
        username: 'newuser',
        password: hashedPassword,
      };

      (prismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.create(userDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          username: 'newuser',
          password: hashedPassword,
        },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários', async () => {
      const mockUsers = [
        { id: 1, username: 'user1', password: 'password1' },
        { id: 2, username: 'user2', password: 'password2' },
      ];

      (prismaService.user.findMany as jest.Mock).mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(prismaService.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuário pelo ID', async () => {
      const mockUser = { id: 1, username: 'user1', password: 'password1' };

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve retornar null se o usuário não for encontrado', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(result).toBeNull();
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('findUsername', () => {
    it('deve retornar um usuário pelo nome de usuário', async () => {
      const mockUser = { id: 1, username: 'user1', password: 'password1' };

      (prismaService.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findUsername({ username: 'user1' });

      expect(result).toEqual(mockUser);
      expect(prismaService.user.findFirst).toHaveBeenCalledWith({ where: { username: 'user1' } });
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário pelo ID', async () => {
      const userDto: UserDTO = {
        username: 'updatedUser',
        password: 'newpassword123',
      };

      const hashedPassword = 'hashed_password';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const mockUser = {
        id: 1,
        username: 'updatedUser',
        password: hashedPassword,
      };

      (prismaService.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.update(1, userDto);

      expect(bcrypt.hash).toHaveBeenCalledWith('newpassword123', 10);
      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          username: 'updatedUser',
          password: hashedPassword,
        },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('deve excluir um usuário pelo ID', async () => {
      (prismaService.user.delete as jest.Mock).mockResolvedValue({ id: 1 });

      const result = await service.delete(1);

      expect(result).toEqual({ id: 1 });
      expect(prismaService.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});