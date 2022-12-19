import { NotificationsRepository } from '@/app/repositories/notifications.repository';
import { mock, MockProxy } from 'jest-mock-extended';
import { Notification } from '@/app/entities/notification';
import { Content } from '@/app/entities/content';
import {
  UnreadNotificationRequest,
  UnreadNotificationService,
} from '@/app/services/unread-notification.service';

describe('UnreadNotificationService', () => {
  let notificationsRepository: MockProxy<NotificationsRepository>;

  let unreadNotificationRequest: UnreadNotificationRequest;
  let unreadNotification: UnreadNotificationService;

  beforeAll(() => {
    unreadNotificationRequest = {
      notificationId: 'any_notification_id',
    };

    notificationsRepository = mock();
  });

  beforeEach(() => {
    const notification = new Notification({
      recipientId: 'any_recipient_id',
      category: 'any_category',
      content: new Content('any_content'),
      readAt: new Date(),
    });

    notificationsRepository.findById.mockResolvedValue(notification);

    unreadNotification = new UnreadNotificationService(notificationsRepository);
  });

  it('should be able to unread a notification', async () => {
    const { notification } = await unreadNotification.execute(
      unreadNotificationRequest,
    );

    expect(notification.isRead).toBeFalsy();
    expect(notification.readAt).toBeNull();
  });

  it('should be able to persist a notification', async () => {
    await unreadNotification.execute(unreadNotificationRequest);

    expect(notificationsRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if notification not exists', async () => {
    notificationsRepository.findById.mockResolvedValue(null);

    await expect(() =>
      unreadNotification.execute(unreadNotificationRequest),
    ).rejects.toThrow();
  });
});
