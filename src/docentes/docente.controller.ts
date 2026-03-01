// src/docentes/docentes.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { DocentesService } from './docente.service';
import { CreateDocenteDto, UpdateDocenteDto } from './crear-docente.dto';

@ApiTags('docentes')
@Controller('docentes')
export class DocentesController {
  constructor(private readonly docentesService: DocentesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo docente',
    description: 'Registra un nuevo docente en el sistema',
  })
  @ApiBody({ type: CreateDocenteDto })
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docentesService.create(createDocenteDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los docentes',
    description:
      'Retorna una lista completa de todos los docentes con sus horarios',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Buscar docentes por nombre',
    example: 'Juan',
  })
  async findAll(@Query('search') search?: string) {
    if (search) {
      return this.docentesService.searchByNombre(search);
    }
    return this.docentesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un docente por ID',
    description: 'Retorna un docente específico incluyendo todos sus horarios',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del docente',
    example: 1,
    type: Number,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.findOne(id);
  }

  @Get(':id/horarios')
  @ApiOperation({
    summary: 'Obtener los horarios de un docente',
    description: 'Retorna todos los horarios asignados a un docente específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del docente',
    example: 1,
  })
  findHorarios(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.findHorarios(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un docente',
    description: 'Actualiza los datos de un docente existente',
  })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  @ApiBody({ type: UpdateDocenteDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDocenteDto: UpdateDocenteDto,
  ) {
    return this.docentesService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un docente',
    description:
      'Elimina un docente del sistema (solo si no tiene horarios asignados)',
  })
  @ApiParam({ name: 'id', description: 'ID del docente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.docentesService.remove(id);
  }
}
