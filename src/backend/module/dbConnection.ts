import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import { logger, TypeOrmWinstonLogger } from '@/module/logger';
import runMode from '@/module/runMode';

const connections: { connection: Connection, mode: string }[] = [];

export default new Proxy(<{[key: string]: Promise<Connection>}>{}, {
  get: async (target, mode: string): Promise<Connection> => {
    if (mode === 'close') {
      await Promise.all(
        connections.map((v) => v.connection.close().then(() => logger.info(`disconnection DB (${v.mode})`))),
      );
      return <any>null;
    }
    const t = connections.find((v) => v.mode === mode);
    if (t === undefined) {
      const v = await getConnectionOptions(`${runMode}_${mode}`);
      const connection = await createConnection(
        Object.assign(v, { logger: new TypeOrmWinstonLogger(true) }),
      );
      connections.push({ connection, mode });
      logger.info(`Connection DB (${mode})`);
      return connection;
    }
    return t.connection;
  },
  set: () => {
    throw new Error('Do not call');
  },
});
