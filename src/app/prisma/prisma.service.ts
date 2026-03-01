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
    const adapter = new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL || 'file:./dev.db',
    });

    super({
      adapter,
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('Connection to the database has been established successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Connection to the database has been closed');
  }
}
