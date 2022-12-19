import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationNotFoundError } from '../errors/notification-not-found';
import { NotificationsRepository } from '../repositories/notifications.repository';

export type ReadNotificationRequest = {
  notificationId: string;
};

export type ReadNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class ReadNotificationService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.read();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
