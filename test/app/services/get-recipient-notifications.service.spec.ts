import { NotificationsRepository } from '@/app/repositories/notifications.repository';
import { mock, MockProxy } from 'jest-mock-extended';

import { Notification } from '@/app/entities/notification';
import { Content } from '@/app/entities/content';
import {
  GetRecipientNotificationsRequest,
  GetRecipientNotificationsService,
} from '@/app/services/get-recipient-notifications.service';

describe('GetRecipientNotificationsService', () => {
  let notificationsRepository: MockProxy<NotificationsRepository>;
  let notification: Notification;

  let getRecipientNotificationsRequest: GetRecipientNotificationsRequest;
  let getRecipientNotifications: GetRecipientNotificationsService;

  beforeAll(() => {
    getRecipientNotificationsRequest = {
      recipientId: 'any_recipient_id',
    };

    notificationsRepository = mock();
  });

  beforeEach(() => {
    notification = new Notification({
      recipientId: 'any_recipient_id',
      category: 'any_category',
      content: new Content('any_content'),
    });

    notificationsRepository.findManyByRecipientId.mockResolvedValue([
      notification,
    ]);

    getRecipientNotifications = new GetRecipientNotificationsService(
      notificationsRepository,
    );
  });

  it('should be able to cancel a notification', async () => {
    const { notifications } = await getRecipientNotifications.execute(
      getRecipientNotificationsRequest,
    );

    expect(notifications).toEqual([notification]);
  });
});
