import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications.repository';

export type CountRecipientNotificationsRequest = {
  recipientId: string;
};

export type CountRecipientNotificationsResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countByRecipientId(
      recipientId,
    );

    return { count };
  }
}
