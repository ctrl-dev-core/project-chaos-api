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
import { HorariosService } from './horarios.service';
import { PaginationDto } from 'src/core/global/common/dto/pagination.dto';
import { IdDto } from 'src/core/global/common/dto/basic.dto';
import { CreateHorarioDto, UpdateHorarioDto } from './crear-horario.dto';

@ApiTags('Horarios')
@Controller('horarios')
export class HorariosController {
  constructor(private readonly horariosService: HorariosService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo horario',
    description: 'Registra un nuevo horario en el sistema',
  })
  @ApiBody({ type: CreateHorarioDto })
  async create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.create(createHorarioDto);
  }

  @Post('check-conflicts')
  @ApiOperation({
    summary: 'Verificar conflictos de horario',
    description:
      'Verifica si un horario tiene conflictos con horarios existentes',
  })
  @ApiBody({ type: CreateHorarioDto })
  async checkConflicts(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horariosService.checkConflicts(createHorarioDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener horarios paginados',
    description: 'Retorna una lista paginada de horarios',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Texto para buscar por materia, docente o paralelo',
  })
  async findAll(@Query('search') search?: string) {
    return this.horariosService.findAll(search || '');
  }

  @Get('/pagination')
  @ApiOperation({
    summary: 'Obtener todos los horarios con paginación',
    description: 'Retorna una lista completa de todos los horarios',
  })
  async findAllList(@Query() pagination: PaginationDto) {
    return this.horariosService.findAllPaginated(pagination);
  }

  @Get('materia/:materiaId')
  @ApiOperation({
    summary: 'Obtener horarios por materia',
    description: 'Retorna todos los horarios de una materia específica',
  })
  @ApiParam({
    name: 'materiaId',
    description: 'ID de la materia',
    example: 1,
  })
  async findByMateria(@Param('materiaId', ParseIntPipe) materiaId: number) {
    return this.horariosService.findByMateria(materiaId);
  }

  @Get('docente/:docenteId')
  @ApiOperation({
    summary: 'Obtener horarios por docente',
    description: 'Retorna todos los horarios de un docente específico',
  })
  @ApiParam({
    name: 'docenteId',
    description: 'ID del docente',
    example: 1,
  })
  async findByDocente(@Param('docenteId', ParseIntPipe) docenteId: number) {
    return this.horariosService.findByDocente(docenteId);
  }

  @Get('dia/:dia')
  @ApiOperation({
    summary: 'Obtener horarios por día',
    description: 'Retorna todos los horarios de un día específico',
  })
  @ApiParam({
    name: 'dia',
    description: 'Día de la semana',
    example: 'LUNES',
    enum: ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'],
  })
  async findByDia(@Param('dia') dia: string) {
    return this.horariosService.findByDia(dia);
  }

  @Get('plan/:planId')
  @ApiOperation({
    summary: 'Obtener horarios por plan',
    description: 'Retorna todos los horarios de un plan específico',
  })
  @ApiParam({
    name: 'planId',
    description: 'ID del plan',
    example: 1,
  })
  async findByPlan(@Param('planId', ParseIntPipe) planId: number) {
    return this.horariosService.findByPlan(planId);
  }

  @Get('semestre/:semestreId')
  @ApiOperation({
    summary: 'Obtener horarios por semestre',
    description: 'Retorna todos los horarios de un semestre específico',
  })
  @ApiParam({
    name: 'semestreId',
    description: 'ID del semestre',
    example: 1,
  })
  async findBySemestre(@Param('semestreId', ParseIntPipe) semestreId: number) {
    return this.horariosService.findBySemestre(semestreId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un horario por ID',
    description: 'Retorna un horario específico con todos sus detalles',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del horario',
    example: 1,
  })
  async findOne(@Param() params: IdDto) {
    const { id } = params;
    return this.horariosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un horario',
    description: 'Actualiza los datos de un horario existente',
  })
  @ApiBody({ description: 'Datos del horario', type: UpdateHorarioDto })
  async update(
    @Param() params: IdDto,
    @Body() updateHorarioDto: UpdateHorarioDto,
  ) {
    const { id } = params;
    return this.horariosService.update(id, updateHorarioDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un horario',
    description: 'Elimina un horario del sistema',
  })
  async remove(@Param() params: IdDto) {
    const { id } = params;
    return this.horariosService.remove(id);
  }
}
