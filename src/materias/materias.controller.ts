// src/planes/planes.controller.ts
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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { IdDto } from 'src/common/dto/basic.dto';
import { PlanesService } from './materias.service';
import { CreatePlanDto, UpdatePlanDto } from './crear-materia.dto';

@ApiTags('Planes')
@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo plan',
    description: 'Registra un nuevo plan de estudio en el sistema',
  })
  @ApiBody({ type: CreatePlanDto })
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planesService.create(createPlanDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener planes paginados',
    description: 'Retorna una lista paginada de planes con sus materias',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Texto para buscar por nombre del plan',
  })
  async findAll(@Query('search') search?: string) {
    return this.planesService.findAll(search || '');
  }

  @Get('/pagination')
  @ApiOperation({
    summary: 'Obtener todos los planes con paginación',
    description:
      'Retorna una lista completa de todos los planes con sus materias',
  })
  async findAllList(@Query() pagination: PaginationDto) {
    return this.planesService.findAllPaginated(pagination);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un plan por ID',
    description: 'Retorna un plan específico incluyendo todas sus materias',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del plan',
    example: 1,
  })
  findOne(@Param() params: IdDto) {
    const { id } = params;
    return this.planesService.findOne(id);
  }

  @Get(':id/materias')
  @ApiOperation({
    summary: 'Obtener las materias de un plan',
    description: 'Retorna todas las materias asignadas a un plan específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del plan',
    example: 1,
  })
  findMaterias(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.findMaterias(id);
  }

  @Get(':id/materias/semestre/:semestreId')
  @ApiOperation({
    summary: 'Obtener materias de un plan por semestre',
    description: 'Retorna las materias de un plan filtradas por semestre',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del plan',
    example: 1,
  })
  @ApiParam({
    name: 'semestreId',
    description: 'ID del semestre',
    example: 1,
  })
  findMateriasBySemestre(
    @Param('id', ParseIntPipe) id: number,
    @Param('semestreId', ParseIntPipe) semestreId: number,
  ) {
    return this.planesService.findMateriasBySemestre(id, semestreId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un plan',
    description: 'Actualiza los datos de un plan existente',
  })
  @ApiBody({ description: 'Datos del plan', type: UpdatePlanDto })
  update(@Param() params: IdDto, @Body() updatePlanDto: UpdatePlanDto) {
    const { id } = params;
    return this.planesService.update(id, updatePlanDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un plan',
    description: 'Elimina un plan del sistema',
  })
  remove(@Param() params: IdDto) {
    const { id } = params;
    return this.planesService.remove(id);
  }
}
