import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PlanesService } from './planes.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreatePlanDto } from './crear-plan.dto';

@ApiTags('planes')
@Controller('planes')
export class PlanesController {
  constructor(private readonly planesService: PlanesService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los planes de estudio',
    description:
      'Retorna una lista completa de todos los planes de estudio disponibles',
  })
  async findAll() {
    return this.planesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un plan de estudio por ID',
    description: 'Retorna un plan específico incluyendo todas sus materias',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del plan de estudio',
    example: 1,
    type: Number,
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.planesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo plan de estudio',
    description: 'Crea un nuevo plan de estudio con el nombre proporcionado',
  })
  @ApiBody({
    type: CreatePlanDto,
    description: 'Datos del plan a crear',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createPlanDto: CreatePlanDto) {
    return this.planesService.create(createPlanDto);
  }
}
