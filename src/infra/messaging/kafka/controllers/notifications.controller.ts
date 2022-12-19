import { SendNotificationService } from '@/app/services/send-notification.service';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

type SendNotificationPayload = {
  recipientId: string;
  content: string;
  category: string;
};

@Controller()
export class NotificationsController {
  private readonly logger = new Logger(NotificationsController.name);

  constructor(
    private readonly sendNotificationService: SendNotificationService,
  ) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() payload: SendNotificationPayload) {
    this.logger.log(`Received send notification event: ${payload}`);

    await this.sendNotificationService.execute(payload);

    this.logger.log(`Sent notification to ${payload.recipientId}!`);
  }
}
