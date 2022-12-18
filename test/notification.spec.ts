import { Content } from 'src/app/entities/content';
import { Notification } from '../src/app/entities/notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('any_content'),
      category: 'any_category',
      recipientId: 'any_recipient',
      readAt: new Date(),
    });

    expect(notification).toBeTruthy();
  });
});
