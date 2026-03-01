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
import { MateriasService } from './materias.service';
import { PaginationDto } from 'src/core/global/common/dto/pagination.dto';
import { IdDto } from 'src/core/global/common/dto/basic.dto';
import { CreateMateriaDto, UpdateMateriaDto } from './crear-materia.dto';

@ApiTags('Materias')
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva materia',
    description: 'Registra una nueva materia en el sistema',
  })
  @ApiBody({ type: CreateMateriaDto })
  async create(@Body() createMateriaDto: CreateMateriaDto) {
    return this.materiasService.create(createMateriaDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener materias paginadas',
    description: 'Retorna una lista paginada de materias',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Texto para buscar por nombre de la materia',
  })
  async findAll(@Query('search') search?: string) {
    return this.materiasService.findAll(search || '');
  }

  @Get('/pagination')
  @ApiOperation({
    summary: 'Obtener todas las materias con paginación',
    description: 'Retorna una lista completa de todas las materias',
  })
  async findAllList(@Query() pagination: PaginationDto) {
    return this.materiasService.findAllPaginated(pagination);
  }

  @Get('plan/:planId')
  @ApiOperation({
    summary: 'Obtener materias por plan',
    description: 'Retorna todas las materias de un plan específico',
  })
  @ApiParam({
    name: 'planId',
    description: 'ID del plan',
    example: 1,
  })
  async findByPlan(@Param('planId', ParseIntPipe) planId: number) {
    return this.materiasService.findByPlan(planId);
  }

  @Get('semestre/:semestreId')
  @ApiOperation({
    summary: 'Obtener materias por semestre',
    description: 'Retorna todas las materias de un semestre específico',
  })
  @ApiParam({
    name: 'semestreId',
    description: 'ID del semestre',
    example: 1,
  })
  async findBySemestre(@Param('semestreId', ParseIntPipe) semestreId: number) {
    return this.materiasService.findBySemestre(semestreId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una materia por ID',
    description: 'Retorna una materia específica con todos sus detalles',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la materia',
    example: 1,
  })
  async findOne(@Param() params: IdDto) {
    const { id } = params;
    return this.materiasService.findOne(id);
  }

  @Get(':id/horarios')
  @ApiOperation({
    summary: 'Obtener los horarios de una materia',
    description:
      'Retorna todos los horarios asignados a una materia específica',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la materia',
    example: 1,
  })
  async findHorarios(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.findHorarios(id);
  }

  @Get(':id/prerrequisitos')
  @ApiOperation({
    summary: 'Obtener los prerrequisitos de una materia',
    description:
      'Retorna el prerrequisito y las materias que tienen esta como prerrequisito',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la materia',
    example: 1,
  })
  async findPrerrequisitos(@Param('id', ParseIntPipe) id: number) {
    return this.materiasService.findPrerrequisitos(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una materia',
    description: 'Actualiza los datos de una materia existente',
  })
  @ApiBody({ description: 'Datos de la materia', type: UpdateMateriaDto })
  async update(
    @Param() params: IdDto,
    @Body() updateMateriaDto: UpdateMateriaDto,
  ) {
    const { id } = params;
    return this.materiasService.update(id, updateMateriaDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una materia',
    description: 'Elimina una materia del sistema',
  })
  async remove(@Param() params: IdDto) {
    const { id } = params;
    return this.materiasService.remove(id);
  }
}
