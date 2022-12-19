import { Module } from '@nestjs/common';
import { SendNotificationService } from '@/app/services/send-notification.service';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotificationService } from '@/app/services/cancel-notification.service';
import { ReadNotificationService } from '@/app/services/read-notification.service';
import { CountRecipientNotificationsService } from '@/app/services/count-recipient-notifications.service';
import { UnreadNotificationService } from '@/app/services/unread-notification.service';
import { GetRecipientNotificationsService } from '@/app/services/get-recipient-notifications.service';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationService,
    CancelNotificationService,
    ReadNotificationService,
    CountRecipientNotificationsService,
    UnreadNotificationService,
    GetRecipientNotificationsService,
  ],
})
export class HttpModule {}
