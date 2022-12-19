import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotificationService } from '@/app/services/send-notification.service';
import { CreateNotificationDto } from '../dtos/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotificationService } from '@/app/services/cancel-notification.service';
import { ReadNotificationService } from '@/app/services/read-notification.service';
import { UnreadNotificationService } from '@/app/services/unread-notification.service';
import { CountRecipientNotificationsService } from '@/app/services/count-recipient-notifications.service';
import { GetRecipientNotificationsService } from '@/app/services/get-recipient-notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationService: SendNotificationService,
    private readonly cancelNotificationService: CancelNotificationService,
    private readonly readNotificationService: ReadNotificationService,
    private readonly unreadNotificationService: UnreadNotificationService,
    private readonly countRecipientNotificationsService: CountRecipientNotificationsService,
    private readonly getRecipientNotificationsService: GetRecipientNotificationsService,
  ) {}

  @Post()
  async create(@Body() data: CreateNotificationDto) {
    const { notification } = await this.sendNotificationService.execute(data);

    return NotificationViewModel.toHttp(notification);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    const { notification } = await this.cancelNotificationService.execute({
      notificationId: id,
    });

    return NotificationViewModel.toHttp(notification);
  }

  @Get('/count/unread/:recipientId')
  async countUnreadFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotificationsService.execute({
      recipientId,
    });

    return { count };
  }

  @Get('/from/:recipientId')
  async getByRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.getRecipientNotificationsService.execute({
        recipientId,
      });

    return notifications.map((notification) =>
      NotificationViewModel.toHttp(notification),
    );
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    const { notification } = await this.readNotificationService.execute({
      notificationId: id,
    });

    return NotificationViewModel.toHttp(notification);
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    const { notification } = await this.unreadNotificationService.execute({
      notificationId: id,
    });

    return NotificationViewModel.toHttp(notification);
  }
}
