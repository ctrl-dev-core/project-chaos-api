import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/app/prisma/prisma.service';

@Injectable()
export class PlanesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.plan.findMany();
  }

  async findSubjects() {
    return await this.prisma.plan.findMany({
      include: {
        materias: true,
      },
    });
  }

  async findOne(id: number) {
    const response = await this.prisma.plan.findUnique({
      where: { id_plan: id },
      include: {
        materias: {
          include: {
            semestre: true,
          },
        },
      },
    });

    if (!response) {
      throw new NotFoundException(`Plan con ID ${id} no encontrado`);
    }

    return response;
  }
}
