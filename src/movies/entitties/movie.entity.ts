import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Movie {
  @IsNumber()
  id: number;

  @IsString()
  name?: string;

  @IsNumber()
  year?: number;

  @IsOptional()
  @IsString({ each: true })
  genre?: string[];
}
