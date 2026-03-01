// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as dotenv from 'dotenv';
import { PrismaClient } from 'generated/prisma/client';

dotenv.config();

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Crear el adaptador
    const adapter = new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL || 'file:./dev.db',
    });

    // Pasar las opciones correctamente al constructor de PrismaClient
    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Conectado a la base de datos SQLite');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('❌ Desconectado de la base de datos');
  }
}
