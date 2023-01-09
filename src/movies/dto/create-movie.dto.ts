import { PickType } from '@nestjs/swagger';
import { Movie } from '../entitties/movie.entity';

export class CreateMovieDto extends PickType(Movie, [
  'name',
  'genre',
  'year',
] as const) {}
