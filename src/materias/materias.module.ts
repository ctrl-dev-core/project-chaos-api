import { Module } from '@nestjs/common';
import { PlanesService } from './materias.service';
import { PlanesController } from './materias.controller';

@Module({
  controllers: [PlanesController],
  providers: [PlanesService],
  exports: [PlanesService],
})
export class PlanesModule {}
