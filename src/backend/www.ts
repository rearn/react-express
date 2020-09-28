/**
 * @file サーバ起動スクリプト
 */
import { logger } from '@/module/logger';
import dbConnection from '@/module/dbConnection';
import app from './main';

process.on('uncaughtException', (err) => {
  logger.error(err.name);
  logger.error(err.message);
  logger.error(`${err.stack}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled Rejection at: ${p}`);
  logger.error(`reason: ${reason}`);
});

process.on('exit', () => logger.info('app stop'));

(async () => {
  const port = 3000;
  // await beginConnection();
  const server = app.listen(port, () => logger.info(`Listening on port ${port}`));

  const handle: NodeJS.SignalsListener = (code) => {
    logger.info(`receive ${code}`);
    server.close(async () => {
      logger.info('Server terminated');
      (<() => Promise<unknown>><unknown>dbConnection)();
    });
  };

  process.on('SIGINT', handle);
  process.on('SIGTERM', handle);
})();
