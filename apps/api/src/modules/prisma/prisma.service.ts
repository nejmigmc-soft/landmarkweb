import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { prisma } from '@landmark/db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await prisma.$connect();
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }

  get prisma() {
    return prisma;
  }
}
