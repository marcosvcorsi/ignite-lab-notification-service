import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infra/services/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}
}
