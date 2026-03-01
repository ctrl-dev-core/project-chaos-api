import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class searchDto {
  @ApiProperty({
    description: 'Buscador',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class IdDto {
  @ApiProperty({
    description: 'Id',
    required: true,
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  id: number;
}
