import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'Movie';
  }

  @Get('search')
  searchByYear(@Query('year') year: string) {
    return `You are searching a moive at ${year}`;
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return `movie ${id}`;
  }

  @Post()
  create(@Body() data) {
    return 'create movie' + JSON.stringify(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `remove movie - ${id}`;
  }

  @Patch(':id') //FIXME: put and patch diff - patch(all), put(part of ...)
  update(@Param('id') id: string, @Body() data) {
    return { id, ...data };
  }
}
