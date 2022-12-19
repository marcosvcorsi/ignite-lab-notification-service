import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationNotFoundError } from '../errors/notification-not-found';
import { NotificationsRepository } from '../repositories/notifications.repository';

export type UnreadNotificationRequest = {
  notificationId: string;
};

export type UnreadNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class UnreadNotificationService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.unread();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
