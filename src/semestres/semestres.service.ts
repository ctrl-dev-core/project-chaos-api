import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Semestre } from 'generated/prisma/client';

@Injectable()
export class SemestresService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Semestre[]> {
    const response = await this.prisma.semestre.findMany({
      orderBy: {
        numero: 'asc',
      },
    });

    return response;
  }

  async findOne(id: number) {
    const semestre = await this.prisma.semestre.findUnique({
      where: { id_semestre: id },
      include: {
        materias: {
          include: {
            plan: true,
            prerrequisito: true,
            horarios: {
              include: {
                docente: true,
              },
            },
          },
          orderBy: {
            nombre: 'asc',
          },
        },
      },
    });

    if (!semestre) {
      throw new NotFoundException(`Semestre con ID ${id} no encontrado`);
    }

    return semestre;
  }

  async findMaterias(id: number) {
    const semestre = await this.prisma.semestre.findUnique({
      where: { id_semestre: id },
      include: {
        materias: {
          include: {
            plan: true,
            prerrequisito: true,
            horarios: {
              include: {
                docente: true,
              },
            },
          },
          orderBy: {
            nombre: 'asc',
          },
        },
      },
    });

    if (!semestre) {
      throw new NotFoundException(`Semestre con ID ${id} no encontrado`);
    }

    return semestre.materias;
  }

  async findMateriasByPlan(id: number, planId: number) {
    const semestre = await this.prisma.semestre.findUnique({
      where: { id_semestre: id },
      include: {
        materias: {
          where: {
            id_plan: planId,
          },
          include: {
            plan: true,
            prerrequisito: true,
            horarios: {
              include: {
                docente: true,
              },
            },
          },
          orderBy: {
            nombre: 'asc',
          },
        },
      },
    });

    if (!semestre) {
      throw new NotFoundException(`Semestre con ID ${id} no encontrado`);
    }

    return semestre.materias;
  }
}
