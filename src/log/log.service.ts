import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogService {
  constructor(private prisma: PrismaService) {}

  async logRequest(ip: string): Promise<void> {
    await this.prisma.requestLog.create({
      data: {
        ip,
      },
    });
  }

  async countRequests(ip: string, fromDate: Date): Promise<number> {
    return this.prisma.requestLog.count({
      where: {
        ip,
        timestamp: {
          gte: fromDate,
        },
      },
    });
  }
}