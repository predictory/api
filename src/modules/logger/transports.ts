import * as appRoot from 'app-root-path';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { utilities } from 'nest-winston';

export const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike()
    )
});

export const fileTransport = new DailyRotateFile({
    dirname: `${appRoot}/logs`,
    filename: 'log-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '5m',
    maxFiles: '14d'
});
