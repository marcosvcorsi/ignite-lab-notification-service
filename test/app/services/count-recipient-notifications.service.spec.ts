import { NotificationsRepository } from '@/app/repositories/notifications.repository';
import { mock, MockProxy } from 'jest-mock-extended';

import { Notification } from '@/app/entities/notification';
import { Content } from '@/app/entities/content';
import {
  CountRecipientNotificationsRequest,
  CountRecipientNotificationsService,
} from '@/app/services/count-recipient-notifications.service';

describe('CountRecipientNotificationsService', () => {
  let notificationsRepository: MockProxy<NotificationsRepository>;

  let countRecipientNotificationsRequest: CountRecipientNotificationsRequest;
  let countRecipientNotifications: CountRecipientNotificationsService;

  beforeAll(() => {
    countRecipientNotificationsRequest = {
      recipientId: 'any_recipient_id',
    };

    notificationsRepository = mock();
  });

  beforeEach(() => {
    notificationsRepository.countByRecipientId.mockResolvedValue(1);

    countRecipientNotifications = new CountRecipientNotificationsService(
      notificationsRepository,
    );
  });

  it('should be able to cancel a notification', async () => {
    const { count } = await countRecipientNotifications.execute(
      countRecipientNotificationsRequest,
    );

    expect(count).toBe(1);
  });
});
