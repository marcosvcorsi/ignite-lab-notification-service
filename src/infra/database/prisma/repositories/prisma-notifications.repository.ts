import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notification';
import { NotificationsRepository } from '../../../../app/repositories/notifications.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    id,
    content,
    category,
    recipientId,
    readAt,
    createdAt,
  }: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id,
        category,
        recipientId,
        readAt,
        createdAt,
        content: content.value,
      },
    });
  }
}
