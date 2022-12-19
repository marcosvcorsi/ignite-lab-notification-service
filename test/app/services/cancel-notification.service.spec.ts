import { NotificationsRepository } from '../../../src/app/repositories/notifications.repository';
import { mock, MockProxy } from 'jest-mock-extended';
import {
  CancelNotificationRequest,
  CancelNotificationService,
} from '../../../src/app/services/cancel-notification.service';
import { Notification } from '../../../src/app/entities/notification';
import { Content } from '../../../src/app/entities/content';

describe('CancelNotificationService', () => {
  let notificationsRepository: MockProxy<NotificationsRepository>;

  let cancelNotificationRequest: CancelNotificationRequest;
  let cancelNotification: CancelNotificationService;

  beforeAll(() => {
    cancelNotificationRequest = {
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

    cancelNotification = new CancelNotificationService(notificationsRepository);
  });

  it('should be able to cancel a notification', async () => {
    const { notification } = await cancelNotification.execute(
      cancelNotificationRequest,
    );

    expect(notification.isCanceled).toBeTruthy();
    expect(notification.canceledAt).toEqual(expect.any(Date));
  });

  it('should be able to persist a notification', async () => {
    await cancelNotification.execute(cancelNotificationRequest);

    expect(notificationsRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if notification not exists', async () => {
    notificationsRepository.findById.mockResolvedValue(null);

    await expect(() =>
      cancelNotification.execute(cancelNotificationRequest),
    ).rejects.toThrow();
  });
});
