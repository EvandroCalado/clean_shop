import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, Logger } from '@nestjs/common';
import nodemailer, { type Transporter } from 'nodemailer';
import {
  Notification,
  NotificationPort,
} from 'src/customers/application/ports/notification.port';
import {
  CUSTOMER_REPOSITORY,
  CustomerRepositoryPort,
} from 'src/customers/application/ports/customer-repository.port';
import { CustomerId } from 'src/customers/domain/value-objects/customer-id.vo';
import { ApplicationException } from 'src/shared/domain/exceptions/application.exception';

@Injectable()
export class NodemailerEmailAdapter implements NotificationPort {
  private readonly transporter: Transporter;
  private readonly from: string;
  private readonly logger = new Logger(NodemailerEmailAdapter.name);

  constructor(
    @Inject(CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepositoryPort,
    private readonly configService: ConfigService,
  ) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('SMTP_HOST'),
      port: this.configService.getOrThrow<number>('SMTP_PORT'),
      auth: {
        user: this.configService.getOrThrow<string>('SMTP_USER'),
        pass: this.configService.getOrThrow<string>('SMTP_PASSWORD'),
      },
    });
    this.from = this.configService.getOrThrow<string>('SMTP_FROM');
  }

  async sendNotification(notification: Notification): Promise<void> {
    const customer = await this.customerRepository.findById(
      new CustomerId(notification.recipientId),
    );

    if (!customer) {
      throw new ApplicationException(
        `User not found by ${notification.recipientId}`,
      );
    }

    await this.transporter.sendMail({
      from: this.from,
      to: customer.getEmail().toString(),
      subject: notification.subject,
      html: `<p>${notification.message}</p>`,
    });

    this.logger.log(`Email sent to ${customer.getEmail().getValue()}`);
  }
}
