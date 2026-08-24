import { CustomerId } from 'src/customers/value-objects/customer-id.vo';
import { Email } from 'src/customers/value-objects/email.vo';
import { AggregateRoot } from 'src/shared/domain/aggregate-root';

interface CustomerProps {
  id: CustomerId;
  email: Email;
  firstName: string;
  lastName: string;
  isActive: boolean;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Customer extends AggregateRoot {
  public readonly _id: CustomerId;
  public readonly _email: Email;
  public readonly _firstName: string;
  public readonly _lastName: string;
  public readonly _isActive: boolean;
  public readonly _phone: string | null;
  public readonly _createdAt: Date;
  public readonly _updatedAt: Date;

  private constructor(props: CustomerProps) {
    super();
    this._id = props.id;
    this._email = props.email;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._isActive = props.isActive;
    this._phone = props.phone;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  static register(
    email: Email,
    firstName: string,
    lastName: string,
    phone: string,
  ): Customer {
    const id = new CustomerId();
    const now = new Date();

    return new Customer({
      id,
      email,
      firstName,
      lastName,
      phone,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  static reconstitute(props: CustomerProps): Customer {
    return new Customer(props);
  }

  getFullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  getId(): CustomerId {
    return this._id;
  }

  getEmail(): Email {
    return this._email;
  }

  getFirstName(): string {
    return this._firstName;
  }

  getLastName(): string {
    return this._lastName;
  }

  getIsActive(): boolean {
    return this._isActive;
  }

  getPhone(): string | null {
    return this._phone;
  }

  getCreatedAt(): Date {
    return this._createdAt;
  }

  getUpdatedAt(): Date {
    return this._updatedAt;
  }
}
