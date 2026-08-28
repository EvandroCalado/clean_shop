import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepositoryPort,
} from 'src/customers/application/ports/customer-repository.port';
import {
  Notification,
  NotificationPort,
} from 'src/customers/application/ports/notification.port';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.vo';

@Injectable()
export class ConsoleNotificationAdapter implements NotificationPort {
  private readonly logger = new Logger(ConsoleNotificationAdapter.name);

  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepositoryPort,
  ) {}

  async sendNotification(notification: Notification): Promise<void> {
    const customer = await this.customerRepository.findById(
      new CustomerId(notification.recipientId),
    );

    const recipient =
      customer?.getEmail().getValue() ?? notification.recipientId;

    this.logger.log(
      `${notification.subject} To:${recipient} | ${notification.message}`,
    );
  }
}
