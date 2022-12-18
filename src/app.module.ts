import { Module } from '@nestjs/common';
import { PrismaService } from './infra/services/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
