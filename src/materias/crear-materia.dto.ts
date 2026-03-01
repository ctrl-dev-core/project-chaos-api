import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Nombre del plan de estudio',
    example: 'INGENIERIA DE SISTEMAS',
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
    description: 'Descripción del plan de estudio',
    example: 'Plan de estudios actualizado 2023',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  descripcion?: string;
}

export class UpdatePlanDto extends PartialType(CreatePlanDto) {}
