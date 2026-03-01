import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateMateriaDto {
  @ApiProperty({
    description: 'Nombre de la materia',
    example: 'PROGRAMACION I',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @Transform(({ value }) => value?.toUpperCase())
  nombre: string;

  @ApiProperty({
    description: 'ID del plan al que pertenece',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  id_plan: number;

  @ApiProperty({
    description: 'ID del semestre al que pertenece',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  id_semestre: number;

  @ApiProperty({
    description: 'ID de la materia prerrequisito (opcional)',
    example: null,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Min(1)
  id_prerrequisito?: number;

  @ApiProperty({
    description: 'Descripción de la materia',
    example: 'Fundamentos de programación',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  descripcion?: string;

  @ApiProperty({
    description: 'Sigla de la materia',
    example: 'INF-111',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  sigla: string;
}

export class UpdateMateriaDto extends PartialType(CreateMateriaDto) {}
