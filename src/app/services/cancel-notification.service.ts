import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { NotificationNotFoundError } from '../errors/notification-not-found';
import { NotificationsRepository } from '../repositories/notifications.repository';

export type CancelNotificationRequest = {
  notificationId: string;
};

export type CancelNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class CancelNotificationService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
