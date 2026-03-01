import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlanesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.plan.findMany({
      include: {
        materias: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.plan.findUnique({
      where: { id_plan: id },
      include: {
        materias: {
          include: {
            semestre: true,
          },
        },
      },
    });
  }

  async create(data: { nombre: string }) {
    return this.prisma.plan.create({
      data,
    });
  }
}
