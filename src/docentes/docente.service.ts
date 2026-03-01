// src/docentes/docentes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDocenteDto, UpdateDocenteDto } from './crear-docente.dto';

@Injectable()
export class DocentesService {
  constructor(private prisma: PrismaService) {}

  async create(createDocenteDto: CreateDocenteDto) {
    return this.prisma.docente.create({
      data: createDocenteDto,
    });
  }

  async findAll() {
    const docentes = await this.prisma.docente.findMany({
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
    });

    // Transformar la respuesta para incluir el conteo de horarios
    return docentes.map((docente) => ({
      ...docente,
      horariosCount: docente.horarios.length,
    }));
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

  async update(id: number, updateDocenteDto: UpdateDocenteDto) {
    try {
      return await this.prisma.docente.update({
        where: { id_docente: id },
        data: updateDocenteDto,
      });
    } catch (error) {
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }
  }

  async remove(id: number) {
    try {
      // Primero verificar si tiene horarios asignados
      const docente = await this.prisma.docente.findUnique({
        where: { id_docente: id },
        include: {
          horarios: true,
        },
      });

      if (docente?.horarios?.length && docente.horarios.length > 0) {
        throw new Error(
          `No se puede eliminar el docente porque tiene ${docente.horarios.length} horarios asignados`,
        );
      }

      await this.prisma.docente.delete({
        where: { id_docente: id },
      });

      return { message: 'Docente eliminado correctamente' };
    } catch (error) {
      if (error instanceof Error) {
        throw new NotFoundException(error.message);
      }
      throw new NotFoundException(`Docente con ID ${id} no encontrado`);
    }
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

  async searchByNombre(nombre: string) {
    return this.prisma.docente.findMany({
      where: {
        nombre: {
          contains: nombre,
        },
      },
      include: {
        horarios: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }
}
