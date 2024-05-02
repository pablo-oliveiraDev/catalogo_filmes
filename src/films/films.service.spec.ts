import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { PrismaService } from '../prisma/prisma.service';
import { FilmsDTO, updateFilmsDTO } from './films.dto';

describe('FilmsService', () => {
  let service: FilmsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: PrismaService,
          useValue: {
            film: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('deve criar um novo filme', async () => {
      const filmDto: FilmsDTO = {
        title: 'New Film',
        description: 'A new film description',
        releaseDate: new Date('2024-01-01'),
        director: 'John Doe',
        createdBy:1,
        createdAt:null
      };

      const mockFilm = {
        id: 1,
        title: 'New Film',
        description: 'A new film description',
        releaseDate: '2024-01-01',
        director: 'John Doe',
      };

      (prismaService.film.create as jest.Mock).mockResolvedValue(mockFilm);

      const result = await service.create(filmDto);

      expect(prismaService.film.create).toHaveBeenCalledWith({ data: filmDto });
      expect(result).toEqual(mockFilm);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os filmes', async () => {
      const mockFilms = [
        { id: 1, title: 'Film 1', description: 'Description 1', releaseDate: '2023-01-01', director: 'Director 1' },
        { id: 2, title: 'Film 2', description: 'Description 2', releaseDate: '2024-01-01', director: 'Director 2' },
      ];

      (prismaService.film.findMany as jest.Mock).mockResolvedValue(mockFilms);

      const result = await service.findAll();

      expect(result).toEqual(mockFilms);
      expect(prismaService.film.findMany).toHaveBeenCalled();
    });
  });

  describe('isExist', () => {
    it('deve retornar um filme se o título já existir', async () => {
      const mockFilm = { id: 1, title: 'Film Existente', description: 'Description 1', releaseDate: '2023-01-01', director: 'Director 1' };

      (prismaService.film.findFirst as jest.Mock).mockResolvedValue(mockFilm);

      const result = await service.isExist({ title: 'Film Existente' });

      expect(result).toEqual(mockFilm);
      expect(prismaService.film.findFirst).toHaveBeenCalledWith({ where: { title: 'Film Existente' } });
    });

    it('deve retornar null se o filme não existir', async () => {
      (prismaService.film.findFirst as jest.Mock).mockResolvedValue(null);

      const resultado = await service.isExist({ title: 'Film Não Existente' });

      expect(resultado).toBeNull();
      expect(prismaService.film.findFirst).toHaveBeenCalledWith({ where: { title: 'Film Não Existente' } });
    });
  });

  describe('findOne', () => {
    it('deve retornar um filme pelo ID', async () => {
      const mockFilm = { id: 1, title: 'Film 1', description: 'Description 1', releaseDate: '2023-01-01', director: 'Director 1' };

      (prismaService.film.findUnique as jest.Mock).mockResolvedValue(mockFilm);

      const resultado = await service.findOne(1);

      expect(resultado).toEqual(mockFilm);
      expect(prismaService.film.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('deve retornar null se o filme não for encontrado', async () => {
      (prismaService.film.findUnique as jest.Mock).mockResolvedValue(null);

      const resultado = await service.findOne(1);

      expect(resultado).toBeNull();
      expect(prismaService.film.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('update', () => {
    it('deve atualizar um filme pelo ID', async () => {
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
        releaseDate: '2025-01-01',
        director: 'Updated Director',
      };

      (prismaService.film.update as jest.Mock).mockResolvedValue(mockFilm);

      const resultado = await service.update(1, filmUpdateDto);

      expect(prismaService.film.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: 'Updated Film',
          description: 'Updated description',
          releaseDate: new Date('2025-01-01'),
          director: 'Updated Director',
        },
      });
      expect(resultado).toEqual(mockFilm);
    });
  });

  describe('delete', () => {
    it('deve excluir um filme pelo ID', async () => {
      (prismaService.film.delete as jest.Mock).mockResolvedValue({ id: 1 });

      const resultado = await service.delete(1);

      expect(resultado).toEqual({ id: 1 });
      expect(prismaService.film.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});