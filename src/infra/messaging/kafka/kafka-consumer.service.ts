import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      client: {
        clientId: 'notifications',
        brokers: [configService.get<string>('KAFKA_BROKER') as string],
        sasl: {
          mechanism: 'scram-sha-256',
          username: configService.get<string>('KAFKA_USERNAME') as string,
          password: configService.get<string>('KAFKA_PASSWORD') as string,
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
