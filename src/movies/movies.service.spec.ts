import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  const testMovie = { name: 'Title Movie', genre: ['test'], year: 2000 };
  let id: number;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    id = service.create(testMovie);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOne', () => {
    it('sholud create a movie', () => {
      expect(service.getAll().find((el) => el.id === id)).toEqual({
        id,
        ...testMovie,
      });
    });
  });

  describe('getAll', () => {
    it('should return an array', () => {
      const res = service.getAll();
      expect(res).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a Movie object', () => {
      const movie = service.getOne(id);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(id);
    });
    it('should throw a NotFoundException', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Not found movie with id 999');
      }
    });
  });

  describe('deleteOne', () => {
    it('should delete a movie', () => {
      service.deleteOne(id);
      expect(service.getAll().find((el) => el.id === id)).toBeUndefined();
    });
    it('sholud throw a NotFoundException', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('sholud update a movie', () => {
      service.update(id, { name: 'Updated Test' });
      const movie = service.getOne(id);
      expect(movie.name).toEqual('Updated Test');
    });

    it('sholud throw a NotFoundException', () => {
      try {
        service.update(999, { name: 'Updated Test' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
