import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanesModule } from './app/planes/planes.module';
import { PrismaModule } from './app/prisma/prisma.module';
import { SemestresModule } from './app/semestres/semestres.module';
import { DocentesModule } from './app/docentes/docente.module';
import { MateriasModule } from './app/materias/materias.module';

@Module({
  imports: [
    PrismaModule,
    PlanesModule,
    SemestresModule,
    DocentesModule,
    MateriasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
