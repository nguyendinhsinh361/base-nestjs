import { Injectable, NestMiddleware } from '@nestjs/common';
import { MessageEnum } from '@root/common/enums/message.enum';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter: any;

  constructor() {
    this.limiter = rateLimit({
      windowMs: 5 * 1000,
      max: 100,
      message: {
        message: MessageEnum.TOO_MANY_REQUEST_FROM_YOUR_IP,
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.limiter(req, res, next);
  }
}
