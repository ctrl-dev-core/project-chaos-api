import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { SemestresService } from './semestres.service';
import { IdDto } from 'src/core/global/common/dto/basic.dto';

@ApiTags('Semestres')
@Controller('semestres')
export class SemestresController {
  constructor(private readonly semestresService: SemestresService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener semestres paginados',
    description: 'Retorna una lista paginada de semestres con sus materias',
  })
  async findAll() {
    return this.semestresService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un semestre por ID',
    description: 'Retorna un semestre específico incluyendo todas sus materias',
  })
  findOne(@Param() params: IdDto) {
    const { id } = params;
    return this.semestresService.findOne(id);
  }

  @Get(':id/materias')
  @ApiOperation({
    summary: 'Obtener las materias de un semestre',
    description: 'Retorna todas las materias de un semestre específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del semestre',
    example: 1,
  })
  findMaterias(@Param('id', ParseIntPipe) id: number) {
    return this.semestresService.findMaterias(id);
  }

  @Get(':id/materias/:planId/plan')
  @ApiOperation({
    summary: 'Obtener materias de un semestre por plan',
    description: 'Retorna las materias de un semestre filtradas por plan',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del semestre',
    example: 1,
  })
  @ApiParam({
    name: 'planId',
    description: 'ID del plan',
    example: 1,
  })
  findMateriasByPlan(
    @Param('id', ParseIntPipe) id: number,
    @Param('planId', ParseIntPipe) planId: number,
  ) {
    return this.semestresService.findMateriasByPlan(id, planId);
  }
}
