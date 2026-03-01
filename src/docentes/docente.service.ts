// src/docentes/docentes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocenteDto, UpdateDocenteDto } from './crear-docente.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Docente } from 'generated/prisma/client';
import { Pagination } from 'src/common/types/pagination.types';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  async create(createDocenteDto: CreateDocenteDto) {
    const docentes = await this.prisma.docente.findMany();
    return {
      id_docente: docentes.length + 1,
      ...createDocenteDto,
    };
  }

  async findAll(search: string): Promise<Docente[]> {
    const response = await this.prisma.docente.findMany({
      include: {
        horarios: {
          include: {
            materia: true,
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

  async findAllPaginated(
    pagination: PaginationDto,
  ): Promise<Pagination<Docente>> {
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
      this.prisma.docente.findMany({
        where,
        skip,
        take: limit,
        include: {
          horarios: {
            include: {
              materia: true,
            },
          },
        },
        orderBy: {
          nombre: 'asc',
        },
      }),
      this.prisma.docente.count({ where }),
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
    const docente = await this.prisma.docente.findUnique({
      where: { id_docente: id },
      include: {
        horarios: {
          include: {
            materia: {
              include: {
                plan: true,
                semestre: true,
              },
            },
          },
          orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
        },
      },
    });

    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }

    return docente;
  }

  async update(id: number, _updateDocenteDto: UpdateDocenteDto) {
    const docente: Docente | null = await this.prisma.docente.findFirst({
      where: { id_docente: id },
    });

    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }

    return docente;
  }

  async remove(id: number) {
    const docente: Docente | null = await this.prisma.docente.findFirst({
      where: { id_docente: id },
    });

    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }

    return docente;
  }

  async findHorarios(id: number) {
    const docente = await this.prisma.docente.findUnique({
      where: { id_docente: id },
      include: {
        horarios: {
          include: {
            materia: {
              include: {
                plan: true,
                semestre: true,
              },
            },
          },
          orderBy: [{ dia: 'asc' }, { hora_inicio: 'asc' }],
        },
      },
    });

    if (!docente) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }

    return docente.horarios;
  }
}
