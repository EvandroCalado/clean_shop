import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CustomerRegisteredEvent } from 'src/customers/domain/events/customer-registered.event';
import {
  NOTIFICATION_SERVICE,
  NotificationPort,
} from '../ports/notification.port';
import { Inject } from '@nestjs/common';

@EventsHandler(CustomerRegisteredEvent)
export class CustomerRegisteredEventHandler implements IEventHandler<CustomerRegisteredEvent> {
  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationService: NotificationPort,
  ) {}

  async handle(event: CustomerRegisteredEvent) {
    await this.notificationService.sendNotification({
      recipientId: event.customerId,
      subject: 'Welcome to Clean Shop!',
      message: `Welcome to Clean Shop, ${event.firstName}! You have been registered successfully.`,
    });
  }
}
