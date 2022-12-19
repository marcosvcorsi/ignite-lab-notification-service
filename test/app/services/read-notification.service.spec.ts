import { NotificationsRepository } from '@/app/repositories/notifications.repository';
import { mock, MockProxy } from 'jest-mock-extended';
import { Notification } from '@/app/entities/notification';
import { Content } from '@/app/entities/content';
import {
  ReadNotificationRequest,
  ReadNotificationService,
} from '@/app/services/read-notification.service';

describe('ReadNotificationService', () => {
  let notificationsRepository: MockProxy<NotificationsRepository>;

  let readNotificationRequest: ReadNotificationRequest;
  let readNotification: ReadNotificationService;

  beforeAll(() => {
    readNotificationRequest = {
      notificationId: 'any_notification_id',
    };

    notificationsRepository = mock();
  });

  beforeEach(() => {
    const notification = new Notification({
      recipientId: 'any_recipient_id',
      category: 'any_category',
      content: new Content('any_content'),
    });

    notificationsRepository.findById.mockResolvedValue(notification);

    readNotification = new ReadNotificationService(notificationsRepository);
  });

  it('should be able to read a notification', async () => {
    const { notification } = await readNotification.execute(
      readNotificationRequest,
    );

    expect(notification.isRead).toBeTruthy();
    expect(notification.readAt).toEqual(expect.any(Date));
  });

  it('should be able to persist a notification', async () => {
    await readNotification.execute(readNotificationRequest);

    expect(notificationsRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if notification not exists', async () => {
    notificationsRepository.findById.mockResolvedValue(null);

    await expect(() =>
      readNotification.execute(readNotificationRequest),
    ).rejects.toThrow();
  });
});
