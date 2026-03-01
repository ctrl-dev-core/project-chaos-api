import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateDocenteDto {
  @ApiProperty({
    description: 'Nombre completo del docente',
    example: 'JHONNY STORM',
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
    description: 'Correo electrónico del docente',
    example: 'jhonny.storm@edu.bo',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  correo?: string;
}

export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {}
