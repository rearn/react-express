/**
 * @file logger の設定
 */
import {
  createLogger, format, transports, Logger as WinstonLogger,
} from 'winston';
import morgan from 'morgan';
import { FileLogger, Logger } from 'typeorm';
import runMode from '@/module/runMode';

/**
 * logger 取得
 */
export const logger = (() => {
  const devConsol = new transports.Console({
    level: 'http',
    format: format.combine(
      format.timestamp(),
      format.cli(),
      format.printf((info) => `[${info.timestamp}] ${info.level} ${info.message}`),
    ),
  });
  const fileOut = new transports.File({
    filename: 'debug.log',
    level: 'debug',
    format: format.combine(
      format.timestamp(),
      format.splat(),
      format.json(),
    ),
  });
  const a = createLogger({
    transports: [
      devConsol,
      fileOut,
    ],
  });
  // 初回実行なのでその旨を表示
  a.info(`app start (ENV: ${runMode})`);
  return a;
})();

/**
 * サーバの logger を返す
 */
export const httpLogger = morgan('combined', {
  stream: {
    write: (str) => {
      logger.http(str.replace(/\r?\n/g, ''));
    },
  },
});

/**
 * DB の logger を設定する
 */
export class TypeOrmWinstonLogger extends FileLogger implements Logger {
  protected logger: WinstonLogger;

  constructor(options?: boolean | 'all' | ('error' | 'log' | 'info' | 'warn' | 'query' | 'schema' | 'migration')[] | undefined) {
    super(options);
    this.logger = logger;
  }

  protected write(strings: string | string[]): void {
    const log = strings instanceof Array ? JSON.stringify(strings) : strings;
    this.logger.info(log);
  }
}
