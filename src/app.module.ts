import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanesModule } from './planes/planes.module';
import { PrismaModule } from './prisma/prisma.module';
import { DocentesModule } from './docentes/docente.module';

@Module({
  imports: [PrismaModule, PlanesModule, DocentesModule, PlanesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
