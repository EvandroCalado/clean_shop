import { DomainException } from 'src/shared/domain/exceptions/domain.exception';

export class Email {
  private static readonly EMAIL_PATTERN =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string): Email {
    const trimed = value.trim().toLocaleLowerCase();

    if (!trimed) {
      throw new DomainException('Email cannot be empty');
    }

    if (!Email.EMAIL_PATTERN.test(trimed)) {
      throw new DomainException(`Invalid email format: ${trimed}`);
    }

    return new Email(trimed);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
