// src/planes/planes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Plan } from 'generated/prisma/client';
import { Pagination } from 'src/common/types/pagination.types';
import { CreatePlanDto, UpdatePlanDto } from './crear-materia.dto';

@Injectable()
export class PlanesService {
  constructor(private prisma: PrismaService) {}

  async create(createPlanDto: CreatePlanDto) {
    const planes = await this.prisma.plan.findMany();
    return {
      id_plan: planes.length + 1,
      ...createPlanDto,
    };
  }

  async findAll(search: string): Promise<Plan[]> {
    const response = await this.prisma.plan.findMany({
      include: {
        materias: {
          include: {
            semestre: true,
            horarios: {
              include: {
                docente: true,
              },
            },
          },
        },
      },
      orderBy: {
        nombre: 'asc',
      },
      where: {
        nombre: {
          contains: search,
        },
      },
    });

    return response;
  }

  async findAllPaginated(pagination: PaginationDto): Promise<Pagination<Plan>> {
    const { page, size: limit, search } = pagination;

    const skip = (page - 1) * limit;

    const where = search
      ? {
          nombre: {
            contains: search,
            mode: 'insensitive' as const,
          },
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.plan.findMany({
        where,
        skip,
        take: limit,
        include: {
          materias: {
            include: {
              semestre: true,
            },
          },
        },
        orderBy: {
          nombre: 'asc',
        },
      }),
      this.prisma.plan.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      next: page * limit < total ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    };
  }

  async findOne(id: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id_plan: id },
      include: {
        materias: {
          include: {
            semestre: true,
            prerrequisito: true,
            horarios: {
              include: {
                docente: true,
              },
            },
          },
          orderBy: [{ id_semestre: 'asc' }, { nombre: 'asc' }],
        },
      },
    });

    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }

    return plan;
  }

  async update(id: number, _updatePlanDto: UpdatePlanDto) {
    const plan: Plan | null = await this.prisma.plan.findFirst({
      where: { id_plan: id },
    });

    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }

    return plan;
  }

  async remove(id: number) {
    const plan: Plan | null = await this.prisma.plan.findFirst({
      where: { id_plan: id },
    });

    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }

    return plan;
  }

  async findMaterias(id: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id_plan: id },
      include: {
        materias: {
          include: {
            semestre: true,
            prerrequisito: true,
            horarios: {
              include: {
                docente: true,
              },
            },
          },
          orderBy: [{ id_semestre: 'asc' }, { nombre: 'asc' }],
        },
      },
    });

    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }

    return plan.materias;
  }

  async findMateriasBySemestre(id: number, semestreId: number) {
    const plan = await this.prisma.plan.findUnique({
      where: { id_plan: id },
      include: {
        materias: {
          where: {
            id_semestre: semestreId,
          },
          include: {
            semestre: true,
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

    if (!plan) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }

    return plan.materias;
  }
}
