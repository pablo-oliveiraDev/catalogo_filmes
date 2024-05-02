import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserDTO } from './user.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: { 
          findAll: jest.fn(),
          findOne: jest.fn(),
          findUsername: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        }},
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários com status OK', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      (usersService.findAll as jest.Mock).mockResolvedValue(mockUsers);

      const result = await controller.findAll(mockResponse);

      expect(usersService.findAll).toHaveBeenCalled();
      expect(result).toBe(mockUsers);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    });
  });

  describe('findOne', () => {
    it('deve retornar um usuário pelo ID com status OK', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockUser = { id: 1, username: 'user1' };
      (usersService.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.findOne(1, mockResponse);

      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(result).toBe(mockUser);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('deve retornar NOT_FOUND quando usuário não for encontrado', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      (usersService.findOne as jest.Mock).mockResolvedValue(null);

      const result = await controller.findOne(1, mockResponse);

      expect(usersService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'User not found' });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('create', () => {
    it('deve criar um novo usuário e retornar status CREATED', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockUser = { id: 1, username: 'newuser' };
      const mockRegisterDto = { username: 'newuser', password: 'password123' };

      (usersService.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.create(mockRegisterDto, mockResponse);

      expect(usersService.create).toHaveBeenCalledWith(mockRegisterDto);
      expect(result).toEqual({ user: mockUser, message: 'User registered successfully' });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
    });

    it('deve retornar NOT_FOUND se o nome de usuário já existir', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockRegisterDto = { username: 'existinguser', password: 'password123' };

      (usersService.findUsername as jest.Mock).mockResolvedValue(true);

      const result = await controller.create(mockRegisterDto, mockResponse);

      expect(usersService.findUsername).toHaveBeenCalledWith(mockRegisterDto);
      expect(result).toEqual({ message: 'Username already exist' });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário pelo ID com status OK', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockUser = { id: 1, username: 'updatedUser' };
      const mockUpdateUserDto = { username: 'updatedUser', password: 'newpassword123' };

      (usersService.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await controller.update(1, mockUpdateUserDto, mockResponse);

      expect(usersService.update).toHaveBeenCalledWith(1, mockUpdateUserDto);
      expect(result).toEqual({ message: 'Update Successful', user: mockUser });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('deve retornar NOT_FOUND se o usuário não for encontrado', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      const mockUpdateUserDto = { username: 'updatedUser', password: 'newpassword123' };

      (usersService.update as jest.Mock).mockResolvedValue(null);

      const result = await controller.update(1, mockUpdateUserDto, mockResponse);

      expect(usersService.update).toHaveBeenCalledWith(1, mockUpdateUserDto);
      expect(result).toEqual({ message: 'User is not found!' });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    });
  });

  describe('delete', () => {
    it('deve excluir um usuário pelo ID com status OK', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as unknown as Response;

      (usersService.delete as jest.Mock).mockResolvedValue(true);

      const result = await controller.delete(1, mockResponse);

      expect(usersService.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'User as deleted!' });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
    });

    it('deve retornar BAD_REQUEST se a exclusão falhar', async () => {
      const mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      }as unknown as Response;

      (usersService.delete as jest.Mock).mockResolvedValue(false);

      const result = await controller.delete(1, mockResponse);

      expect(usersService.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Failed to delete user!' });
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    });
  });
});