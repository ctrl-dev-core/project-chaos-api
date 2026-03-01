// src/planes/dto/create-plan.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({
    description: 'Nombre del plan de estudio',
    example: 'Mención Desarrollo de Software e Innovación Tecnológica',
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;
}
