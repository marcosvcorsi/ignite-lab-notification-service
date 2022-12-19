import { Injectable } from '@nestjs/common';
import { Notification } from '@/app/entities/notification';
import { NotificationsRepository } from '@/app/repositories/notifications.repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationsMapper } from '../mappers/prisma-notification.mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async countByRecipientId(recipientId: string): Promise<number> {
    return this.prismaService.notification.count({
      where: {
        recipientId,
        readAt: null,
      },
    });
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications.map(PrismaNotificationsMapper.toDomain);
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationsMapper.toPersistence(notification);

    delete data.id;

    await this.prismaService.notification.update({
      where: {
        id: notification.id,
      },
      data,
    });
  }

  async create(data: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: PrismaNotificationsMapper.toPersistence(data),
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationsMapper.toDomain(notification);
  }
}
