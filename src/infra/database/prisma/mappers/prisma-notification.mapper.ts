import { Content } from '@/app/entities/content';
import { Notification } from '@/app/entities/notification';
import { Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationsMapper {
  static toPersistence(notification: Notification) {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
      readAt: notification.readAt ?? null,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt ?? null,
    };
  }

  static toDomain(notification: PrismaNotification): Notification {
    return new Notification({
      id: notification.id,
      recipientId: notification.recipientId,
      content: new Content(notification.content),
      category: notification.category,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    });
  }
}
