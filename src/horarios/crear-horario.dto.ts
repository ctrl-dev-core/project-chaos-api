import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsIn,
  Matches,
} from 'class-validator';

//TODO: export in a enum
const DIAS_VALIDOS = [
  'LUNES',
  'MARTES',
  'MIERCOLES',
  'JUEVES',
  'VIERNES',
  'SABADO',
];

export class CreateHorarioDto {
  @ApiProperty({
    description: 'ID de la materia',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  id_materia: number;

  @ApiProperty({
    description: 'ID del docente',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  id_docente: number;

  @ApiProperty({
    description: 'Día de la semana',
    example: 'LUNES',
    enum: DIAS_VALIDOS,
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(DIAS_VALIDOS)
  @Transform(({ value }) => value?.toUpperCase())
  dia: string;

  @ApiProperty({
    description: 'Hora de inicio (formato HH:MM)',
    example: '10:00',
    pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe tener formato HH:MM (ejemplo: 10:00)',
  })
  hora_inicio: string;

  @ApiProperty({
    description: 'Hora de fin (formato HH:MM)',
    example: '12:00',
    pattern: '^([0-1][0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'La hora debe tener formato HH:MM (ejemplo: 12:00)',
  })
  hora_fin: string;

  @ApiProperty({
    description: 'Paralelo o grupo',
    example: 'A',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  paralelo?: string;

  @ApiProperty({
    description: 'Aula o laboratorio',
    example: 'P3-Lab1',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.toUpperCase())
  aula?: string;
}

export class UpdateHorarioDto extends PartialType(CreateHorarioDto) {}
