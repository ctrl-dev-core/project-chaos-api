import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Horario } from 'generated/prisma/client';
import { Pagination } from 'src/common/types/pagination.types';
import { CreateHorarioDto, UpdateHorarioDto } from './crear-horario.dto';

@Injectable()
export class HorariosService {
  constructor(private prisma: PrismaService) {}

  async create(createHorarioDto: CreateHorarioDto) {
    const horarios = await this.prisma.horario.findMany();
    return {
      id_horario: horarios.length + 1,
      ...createHorarioDto,
    };
  }

  async findAll(search: string): Promise<Horario[]> {
    const response = await this.prisma.horario.findMany({
      include: {
        materia: {
          include: {
            plan: true,
            semestre: true,
          },
        },
        docente: true,
      },
      orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
      where: {
        OR: [
          {
            materia: {
              nombre: {
                contains: search,
              },
            },
          },
          {
            docente: {
              nombre: {
                contains: search,
              },
            },
          },
          {
            paralelo: {
              contains: search,
            },
          },
        ],
      },
    });

    return response;
  }

  async findAllPaginated(
    pagination: PaginationDto,
  ): Promise<Pagination<Horario>> {
    const { page, size: limit, search } = pagination;

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              materia: {
                nombre: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
            },
            {
              docente: {
                nombre: {
                  contains: search,
                  mode: 'insensitive' as const,
                },
              },
            },
            {
              paralelo: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {};

    const [data, total] = await this.prisma.$transaction([
      this.prisma.horario.findMany({
        where,
        skip,
        take: limit,
        include: {
          materia: {
            include: {
              plan: true,
              semestre: true,
            },
          },
          docente: true,
        },
        orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
      }),
      this.prisma.horario.count({ where }),
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
    const horario = await this.prisma.horario.findUnique({
      where: { id_horario: id },
      include: {
        materia: {
          include: {
            plan: true,
            semestre: true,
            prerrequisito: true,
          },
        },
        docente: true,
      },
    });

    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }

    return horario;
  }

  async update(id: number, _updateHorarioDto: UpdateHorarioDto) {
    const horario: Horario | null = await this.prisma.horario.findFirst({
      where: { id_horario: id },
    });

    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }

    return horario;
  }

  async remove(id: number) {
    const horario: Horario | null = await this.prisma.horario.findFirst({
      where: { id_horario: id },
    });

    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }

    return horario;
  }

  async findByMateria(materiaId: number) {
    const horarios = await this.prisma.horario.findMany({
      where: { id_materia: materiaId },
      include: {
        docente: true,
        materia: {
          include: {
            plan: true,
            semestre: true,
          },
        },
      },
      orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
    });

    return horarios;
  }

  async findByDocente(docenteId: number) {
    const horarios = await this.prisma.horario.findMany({
      where: { id_docente: docenteId },
      include: {
        materia: {
          include: {
            plan: true,
            semestre: true,
          },
        },
        docente: true,
      },
      orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
    });

    return horarios;
  }

  async findByDia(dia: string) {
    const horarios = await this.prisma.horario.findMany({
      where: {
        dia: {
          equals: dia,
        },
      },
      include: {
        materia: {
          include: {
            plan: true,
            semestre: true,
          },
        },
        docente: true,
      },
      orderBy: [{ hora_inicio: 'asc' }],
    });

    return horarios;
  }

  async findByPlan(planId: number) {
    const horarios = await this.prisma.horario.findMany({
      where: {
        materia: {
          id_plan: planId,
        },
      },
      include: {
        materia: {
          include: {
            plan: true,
            semestre: true,
          },
        },
        docente: true,
      },
      orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
    });

    return horarios;
  }

  async findBySemestre(semestreId: number) {
    const horarios = await this.prisma.horario.findMany({
      where: {
        materia: {
          id_semestre: semestreId,
        },
      },
      include: {
        materia: {
          include: {
            plan: true,
            semestre: true,
          },
        },
        docente: true,
      },
      orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
    });

    return horarios;
  }

  async checkConflicts(createHorarioDto: CreateHorarioDto) {
    const { id_docente, dia, hora_inicio, hora_fin } = createHorarioDto;

    const conflictos = await this.prisma.horario.findMany({
      where: {
        id_docente,
        dia: {
          equals: dia,
        },
        OR: [
          {
            AND: [
              { hora_inicio: { lte: hora_inicio } },
              { hora_fin: { gt: hora_inicio } },
            ],
          },

          {
            AND: [
              { hora_inicio: { lt: hora_fin } },
              { hora_fin: { gte: hora_fin } },
            ],
          },

          {
            AND: [
              { hora_inicio: { gte: hora_inicio } },
              { hora_fin: { lte: hora_fin } },
            ],
          },
        ],
      },
      include: {
        materia: true,
      },
    });

    return {
      tieneConflictos: conflictos.length > 0,
      conflictos,
    };
  }
}
