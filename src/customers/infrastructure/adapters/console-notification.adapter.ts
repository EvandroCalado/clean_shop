import { Injectable, Logger } from '@nestjs/common';
import {
  Notification,
  NotificationPort,
} from 'src/customers/application/ports/notification.port';

@Injectable()
export class ConsoleNotificationAdapter implements NotificationPort {
  private readonly logger = new Logger(ConsoleNotificationAdapter.name);

  sendNotification(notification: Notification): void {
    this.logger.log(
      `${notification.subject} To:${notification.recipient} | ${notification.message}`,
    );
  }
}
