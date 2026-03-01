import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/core/global/common/dto/pagination.dto';
import { Materia } from 'generated/prisma/client';
import { Pagination } from 'src/core/global/common/types/pagination.types';
import { CreateMateriaDto, UpdateMateriaDto } from './crear-materia.dto';

@Injectable()
export class MateriasService {
  constructor(private prisma: PrismaService) {}

  async create(createMateriaDto: CreateMateriaDto) {
    const materias = await this.prisma.materia.findMany();
    return {
      id_materia: materias.length + 1,
      ...createMateriaDto,
    };
  }

  async findAll(search: string): Promise<Materia[]> {
    const response = await this.prisma.materia.findMany({
      include: {
        plan: true,
        semestre: true,
        prerrequisito: true,
        horarios: {
          include: {
            docente: true,
          },
        },
      },
      orderBy: [{ id_semestre: 'asc' }, { nombre: 'asc' }],
      where: {
        nombre: {
          contains: search,
        },
      },
    });

    return response;
  }

  async findAllPaginated(
    pagination: PaginationDto,
  ): Promise<Pagination<Materia>> {
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
      this.prisma.materia.findMany({
        where,
        skip,
        take: limit,
        include: {
          plan: true,
          semestre: true,
          prerrequisito: true,
          horarios: {
            include: {
              docente: true,
            },
          },
        },
        orderBy: [{ id_semestre: 'asc' }, { nombre: 'asc' }],
      }),
      this.prisma.materia.count({ where }),
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
    const materia = await this.prisma.materia.findUnique({
      where: { id_materia: id },
      include: {
        plan: true,
        semestre: true,
        prerrequisito: true,
        prerequisitos: {
          include: {
            semestre: true,
          },
        },
        horarios: {
          include: {
            docente: true,
          },
          orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
        },
      },
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }

    return materia;
  }

  async update(id: number, _updateMateriaDto: UpdateMateriaDto) {
    const materia: Materia | null = await this.prisma.materia.findFirst({
      where: { id_materia: id },
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }

    return materia;
  }

  async remove(id: number) {
    const materia: Materia | null = await this.prisma.materia.findFirst({
      where: { id_materia: id },
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }

    return materia;
  }

  async findByPlan(planId: number) {
    const materias = await this.prisma.materia.findMany({
      where: { id_plan: planId },
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
    });

    return materias;
  }

  async findBySemestre(semestreId: number) {
    const materias = await this.prisma.materia.findMany({
      where: { id_semestre: semestreId },
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
    });

    return materias;
  }

  async findHorarios(id: number) {
    const materia = await this.prisma.materia.findUnique({
      where: { id_materia: id },
      include: {
        horarios: {
          include: {
            docente: true,
          },
          orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
        },
      },
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }

    return materia.horarios;
  }

  async findPrerrequisitos(id: number) {
    const materia = await this.prisma.materia.findUnique({
      where: { id_materia: id },
      include: {
        prerrequisito: {
          include: {
            semestre: true,
            plan: true,
          },
        },
        prerequisitos: {
          include: {
            semestre: true,
            plan: true,
          },
        },
      },
    });

    if (!materia) {
      throw new NotFoundException(`Materia con ID ${id} no encontrada`);
    }

    return {
      prerrequisito: materia.prerrequisito,
      prerequisitos: materia.prerequisitos,
    };
  }
}
