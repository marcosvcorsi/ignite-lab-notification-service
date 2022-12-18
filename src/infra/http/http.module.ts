import { Module } from '@nestjs/common';
import { SendNotificationService } from 'src/app/services/send-notification.service';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotificationService],
})
export class HttpModule {}
