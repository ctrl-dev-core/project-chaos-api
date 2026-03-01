import { Module } from '@nestjs/common';
import { DocentesController } from './docente.controller';
import { DocentesService } from './docente.service';

@Module({
  controllers: [DocentesController],
  providers: [DocentesService],
  exports: [DocentesService],
})
export class DocentesModule {}
