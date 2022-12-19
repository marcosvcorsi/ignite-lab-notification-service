import { NotificationsRepository } from '@/app/repositories/notifications.repository';
import {
  SendNotificationRequest,
  SendNotificationService,
} from '@/app/services/send-notification.service';
import { mock } from 'jest-mock-extended';

describe('SendNotificationService', () => {
  let notificationsRepository: NotificationsRepository;

  let sendNotificationRequest: SendNotificationRequest;
  let sendNotification: SendNotificationService;

  beforeAll(() => {
    sendNotificationRequest = {
      content: 'any_content',
      category: 'any',
      recipientId: 'any_recipient_id',
    };

    notificationsRepository = mock();
  });

  beforeEach(() => {
    sendNotification = new SendNotificationService(notificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sendNotification.execute(
      sendNotificationRequest,
    );

    expect(notification.content.value).toEqual(sendNotificationRequest.content);
    expect(notification.category).toEqual(sendNotificationRequest.category);
    expect(notification.recipientId).toEqual(
      sendNotificationRequest.recipientId,
    );
  });

  it('should be able to persist a notification', async () => {
    await sendNotification.execute(sendNotificationRequest);

    expect(notificationsRepository.create).toHaveBeenCalledTimes(1);
  });
});
