import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from './log.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(private readonly requestLogService: LogService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    if (!ip) {
        throw new ForbiddenException('Unable to determine IP address');
    }
    const limit = 10;
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    const requestCount = await this.requestLogService.countRequests(ip, oneDayAgo);

    if (requestCount >= limit) {
      throw new ForbiddenException('Request limit exceeded');
    }

    await this.requestLogService.logRequest(ip);
    next();
  }
}