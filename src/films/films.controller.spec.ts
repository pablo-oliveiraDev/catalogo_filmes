import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsDTO, updateFilmsDTO } from './films.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';

describe('FilmsController', () => {
    let controller: FilmsController;
    let filmsService: FilmsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [FilmsController],
            providers: [
                {
                    provide: FilmsService,
                    useValue: {
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<FilmsController>(FilmsController);
        filmsService = module.get<FilmsService>(FilmsService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll', () => {
        it('deve retornar todos os filmes com status OK', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockFilms = [
                { id: 1, title: 'Film 1', description: 'Description 1', releaseDate: new Date(), director: 'Director 1' },
                { id: 2, title: 'Film 2', description: 'Description 2', releaseDate: new Date(), director: 'Director 2' },
            ];

            (filmsService.findAll as jest.Mock).mockResolvedValue(mockFilms);

            const resultado = await controller.getAll(mockResponse);

            expect(filmsService.findAll).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(resultado).toEqual(mockFilms);
        });
    });

    describe('getOne', () => {
        it('deve retornar um filme pelo ID com status OK', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const mockFilm = { id: 1, title: 'Film 1', description: 'Description 1', releaseDate: new Date(), director: 'Director 1' };

            (filmsService.findOne as jest.Mock).mockResolvedValue(mockFilm);

            const resultado = await controller.getOne(1, mockResponse);

            expect(filmsService.findOne).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(resultado).toEqual(mockFilm);
        });

        it('deve retornar NOT_FOUND quando o filme não é encontrado', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (filmsService.findOne as jest.Mock).mockResolvedValue(null);

            const resultado = await controller.getOne(1, mockResponse);

            expect(filmsService.findOne).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
            expect(resultado).toEqual({ message: 'Film not found' });
        });

        it('deve retornar BAD_REQUEST se o ID não for válido', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const resultado = await controller.getOne(null, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(resultado).toEqual({ message: 'id is not null!' });
        });
    });

    describe('create', () => {
        it('deve criar um filme com status CREATED', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const filmDto: FilmsDTO = {
                title: 'New Film',
                description: 'A new film description',
                releaseDate: new Date('2024-01-01'),
                director: 'John Doe',
                createdBy: 1,
                createdAt: null,
            };

            const mockFilm = {
                id: 1,
                title: 'New Film',
                description: 'A new film description',
                releaseDate: new Date('2024-01-01'),
                director: 'John Doe',
            };

            (filmsService.create as jest.Mock).mockResolvedValue(mockFilm);

            const resultado = await controller.create(filmDto, mockResponse);

            expect(filmsService.create).toHaveBeenCalledWith(filmDto);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(resultado).toEqual({ message: 'Created Successfully!', films: mockFilm });
        });
    });

    describe('update', () => {
        it('deve atualizar um filme pelo ID com status OK', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const filmUpdateDto: updateFilmsDTO = {
                title: 'Updated Film',
                description: 'Updated description',
                releaseDate: new Date('2025-01-01'),
                director: 'Updated Director',
            };

            const mockFilm = {
                id: 1,
                title: 'Updated Film',
                description: 'Updated description',
                releaseDate: new Date('2025-01-01'),
                director: 'Updated Director',
            };

            (filmsService.findOne as jest.Mock).mockResolvedValue(mockFilm);
            (filmsService.update as jest.Mock).mockResolvedValue(mockFilm);

            const resultado = await controller.update(1, filmUpdateDto, mockResponse);

            expect(filmsService.update).toHaveBeenCalledWith(1, filmUpdateDto);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(resultado).toEqual({ message: 'User update successful!', film: mockFilm });
        });

        it('deve retornar NOT_FOUND se o filme não for encontrado para atualização', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (filmsService.findOne as jest.Mock).mockResolvedValue(null);

            const resultado = await controller.update(1, {}, mockResponse);

            expect(filmsService.update).not.toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
            expect(resultado).toEqual({ message: 'This user does not exist!' });
        });

        it('deve retornar BAD_REQUEST se o ID não for válido', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const resultado = await controller.update(null, {}, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(resultado).toEqual({ message: 'Field id does not null!' });
        });
    });

    describe('delete', () => {
        it('deve excluir um filme com sucesso e retornar status OK', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (filmsService.findOne as jest.Mock).mockResolvedValue({ id: 1 });
            (filmsService.delete as jest.Mock).mockResolvedValue({ id: 1 });

            const resultado = await controller.delete(1, mockResponse);

            expect(filmsService.delete).toHaveBeenCalledWith(1);
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(resultado).toEqual({ message: 'User deleted!', film: { id: 1 } });
        });

        it('deve retornar NOT_FOUND se o filme não for encontrado para exclusão', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            (filmsService.findOne as jest.Mock).mockResolvedValue(null);

            const resultado = await controller.delete(1, mockResponse);

            expect(filmsService.delete).not.toHaveBeenCalled(); // Certifique-se de que delete não foi chamado
            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
            expect(resultado).toEqual({ message: 'This user does not exist!' });
        });

        it('deve retornar BAD_REQUEST quando o ID é nulo ou inválido', async () => {
            const mockResponse = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            } as unknown as Response;

            const resultado = await controller.delete(null, mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
            expect(resultado).toEqual({ message: 'Field id does not null!' });
        });
    });
});
