import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as dotenv from 'dotenv';
import {
  Docente,
  Horario,
  Materia,
  Plan,
  PrismaClient,
  Semestre,
} from 'generated/prisma/client';
import {
  listaDocentes,
  listaMaterias,
  listaPlanes,
  listaSemestres,
} from 'src/common/constants';

dotenv.config();

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || 'file:./dev.db',
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Sembrando base de datos...');

  // ? Insertando datos de planes
  await Promise.all(
    listaPlanes.map((item: Plan, index: number) =>
      prisma.plan.upsert({
        where: { id_plan: item.id_plan },
        update: {},
        create: item,
      }),
    ),
  ).then(() => console.log('- Planes insertados'));

  // ? Insertando datos de semestres
  await Promise.all(
    listaSemestres.map((item: Semestre, index: number) =>
      prisma.semestre.upsert({
        where: { id_semestre: item.id_semestre },
        update: {},
        create: item,
      }),
    ),
  ).then(() => console.log('- Semestres insertados'));

  // ? Insertando datos de docentes
  await Promise.all(
    listaDocentes.map(async (docente) => {
      await prisma.docente.upsert({
        where: { id_docente: docente.id_docente },
        update: {},
        create: docente,
      });
    }),
  ).then(() => console.log('- Docentes insertados'));

  // ? Insertando datos de materias
  await Promise.all(
    listaMaterias.map((materia: Materia) =>
      prisma.materia.upsert({
        where: { id_materia: materia.id_materia },
        update: {},
        create: materia,
      }),
    ),
  ).then(() => console.log('- Materias insertadas'));

  // ? Insertando datos de horarios
  const horarios: Horario[] = [
    {
      id_horario: 1,
      id_materia: 1,
      id_docente: 1,
      dia: 'Lunes',
      hora_inicio: '10:00',
      hora_fin: '12:00',
      paralelo: 'A',
    },
    {
      id_horario: 2,
      id_materia: 2,
      id_docente: 2,
      dia: 'Martes',
      hora_inicio: '14:00',
      hora_fin: '16:00',
      paralelo: 'B',
    },
  ];

  await Promise.all(
    horarios.map((horario: Horario) =>
      prisma.horario.upsert({
        where: { id_horario: horario.id_horario },
        update: {},
        create: horario,
      }),
    ),
  ).then(() => console.log('- Horarios insertados'));

  console.log('- Base de datos sembrada correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
