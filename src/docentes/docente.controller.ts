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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IdDto } from 'src/common/dto/basic.dto';

@ApiTags('Docentes')
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
    summary: 'Obtener docentes paginados',
    description: 'Retorna una lista paginada de docentes con sus horarios',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Texto para buscar por nombre',
  })
  async findAll(@Query('search') search?: string) {
    return this.docentesService.findAll(search || '');
  }

  @Get('/pagination')
  @ApiOperation({
    summary: 'Obtener todos los docentes con paginación',
    description:
      'Retorna una lista completa de todos los docentes con sus horarios',
  })
  async findAllList(@Query() pagination: PaginationDto) {
    return this.docentesService.findAllPaginated(pagination);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un docente por ID',
    description: 'Retorna un docente específico incluyendo todos sus horarios',
  })
  findOne(@Param() params: IdDto) {
    const { id } = params;
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
  @ApiBody({ description: 'Datos del docente', type: UpdateDocenteDto })
  update(@Param() params: IdDto, @Body() updateDocenteDto: UpdateDocenteDto) {
    const { id } = params;
    return this.docentesService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un docente',
    description: 'Elimina un docente del sistema',
  })
  remove(@Param() params: IdDto) {
    const { id } = params;
    return this.docentesService.remove(id);
  }
}
