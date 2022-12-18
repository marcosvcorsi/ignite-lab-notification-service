import { Body, Controller, Post } from '@nestjs/common';
import { SendNotificationService } from 'src/app/services/send-notification.service';
import { CreateNotificationDto } from '../dtos/create-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly sendNotificationService: SendNotificationService,
  ) {}

  @Post()
  async create(@Body() data: CreateNotificationDto) {
    const { notification } = await this.sendNotificationService.execute(data);

    return notification;
  }
}
