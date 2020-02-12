import * as moment from 'moment';
import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(@Inject('winston') private readonly logger: Logger) { }

    async use(req: Request, res: Response, next: Function) {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        const message = `(${moment(start).format()}) ${req.hostname}: ${req.method} ${req.url} --> ${res.statusCode} in ${ms}ms`;
        this.logger.log({ message, level: 'info' });
    }
}
