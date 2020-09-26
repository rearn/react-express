/**
 * @file DB 関連の関数群
 */
import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import { logger, TypeOrmWinstonLogger } from '@/module/logger';
import runMode from '@/module/runMode';

let connection: Connection|null = null;

/**
 * DB への接続
 */
export const beginConnection = async (): Promise<Connection> => {
  if (connection !== null) {
    return connection;
  }
  const v = await getConnectionOptions(runMode);
  connection = await createConnection(
    Object.assign(v, { logger: new TypeOrmWinstonLogger(true) }),
  );
  logger.info('Connection DB');
  return connection;
};

/**
 * DB との切断
 */
export const closeConnection = async (): Promise<null> => {
  if (connection === null) {
    return null;
  }
  await connection.close();
  logger.info('disconnection DB');
  connection = null;
  return null;
};
