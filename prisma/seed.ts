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
  const planes: Plan[] = [
    {
      id_plan: 1,
      nombre: 'Desarrollo de Software e Innovación Tecnológica',
    },
    { id_plan: 2, nombre: 'IA y Ciencias de Datos' },
    { id_plan: 3, nombre: 'Ciencias de la Computación' },
    { id_plan: 4, nombre: 'Informática Industrial' },
    { id_plan: 5, nombre: 'Ingeniería de Sistemas' },
    { id_plan: 6, nombre: 'Redes y TIC' },
    { id_plan: 7, nombre: 'Seguridad de la Información' },
  ];

  Promise.all(
    planes.map((item: Plan, index: number) =>
      prisma.plan.upsert({
        where: { id_plan: item.id_plan },
        update: {},
        create: item,
      }),
    ),
  ).then(() => console.log('- Planes insertados'));

  // ? Insertando datos de semestres
  const semestres: Semestre[] = [
    {
      id_semestre: 1,
      numero: 1,
      nombre: 'Primer semestre',
    },
    {
      id_semestre: 2,
      numero: 2,
      nombre: 'Segundo semestre',
    },
    {
      id_semestre: 3,
      numero: 3,
      nombre: 'Tercer semestre',
    },
    {
      id_semestre: 4,
      numero: 4,
      nombre: 'Cuarto semestre',
    },
    {
      id_semestre: 5,
      numero: 5,
      nombre: 'Quinto semestre',
    },
    {
      id_semestre: 6,
      numero: 6,
      nombre: 'Sexto semestre',
    },
    {
      id_semestre: 7,
      numero: 7,
      nombre: 'Septimo semestre',
    },
    {
      id_semestre: 8,
      numero: 8,
      nombre: 'Octavo semestre',
    },
    {
      id_semestre: 9,
      numero: 9,
      nombre: 'Noveno semestre',
    },
    {
      id_semestre: 10,
      numero: 10,
      nombre: 'Decimo semestre',
    },
  ];

  Promise.all(
    semestres.map((item: Semestre, index: number) =>
      prisma.semestre.upsert({
        where: { id_semestre: item.id_semestre },
        update: {},
        create: item,
      }),
    ),
  ).then(() => console.log('- Semestres insertados'));

  // ? Insertando datos de docentes
  const docentes: Docente[] = [
    {
      id_docente: 1,
      nombre: 'Dr. Juan Pérez',
      correo: 'juan.perez@universidad.edu',
    },
    {
      id_docente: 2,
      nombre: 'Dra. María García',
      correo: 'maria.garcia@universidad.edu',
    },
    {
      id_docente: 3,
      nombre: 'M.Sc. Carlos López',
      correo: 'carlos.lopez@universidad.edu',
    },
    {
      id_docente: 4,
      nombre: 'Ing. Ana Martínez',
      correo: 'ana.martinez@universidad.edu',
    },
    {
      id_docente: 5,
      nombre: 'Dr. Roberto Sánchez',
      correo: 'roberto.sanchez@universidad.edu',
    },
  ];

  Promise.all(
    docentes.map(async (docente) => {
      await prisma.docente.upsert({
        where: { id_docente: docente.id_docente },
        update: {},
        create: docente,
      });
    }),
  ).then(() => console.log('✅ Docentes insertados'));

  // ? Insertando datos de materias
  const materias: Materia[] = [
    {
      id_materia: 1,
      id_plan: 1,
      id_semestre: 1,
      id_prerrequisito: null,
      nombre: 'Programación I',
    },
    {
      id_materia: 2,
      id_plan: 1,
      id_semestre: 1,
      id_prerrequisito: 1,
      nombre: 'Programación II',
    },
  ];

  Promise.all(
    materias.map((materia: Materia) =>
      prisma.materia.upsert({
        where: { id_materia: materia.id_materia },
        update: {},
        create: materia,
      }),
    ),
  ).then(() => console.log('✅ Materias insertadas'));

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

  Promise.all(
    horarios.map((horario: Horario) =>
      prisma.horario.upsert({
        where: { id_horario: horario.id_horario },
        update: {},
        create: horario,
      }),
    ),
  ).then(() => console.log('✅ Horarios insertados'));

  console.log('✅ Base de datos sembrada correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
