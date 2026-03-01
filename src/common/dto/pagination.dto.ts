import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({
    description: 'Buscador',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    description: 'Número de la página',
    example: 1,
    required: false,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number;

  @ApiProperty({
    description: 'Tamaño de la página',
    example: 10,
    required: false,
    minimum: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number = 10;
}
