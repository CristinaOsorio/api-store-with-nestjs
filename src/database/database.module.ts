import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from 'config';

@Global()
@Module({
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { db, user, password, host, port } = configService.postgres;
        const client = new Client({
          user,
          host,
          password,
          database: db,
          port,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG'],
})
export class DatabaseModule {}
