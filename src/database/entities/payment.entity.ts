import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Question } from './question.entity';
import { AuditableEntity } from './common';
import { PaymentStatus } from 'src/modules/payment/enums/payment-status.enum';
import { PaymentProviderName } from 'src/modules/payment/enums/payment-provider.enum';
import { PaymentMethod } from 'src/modules/payment/enums/payment-method.enum';

@Entity()
export class Payment extends AuditableEntity {
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({ type: 'enum', enum: PaymentProviderName })
  provider: PaymentProviderName;

  @Column({ type: 'enum', enum: PaymentMethod })
  method: PaymentMethod;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ nullable: true, name: 'provider_transaction_id' })
  providerTransactionId: string;

  @Column({ nullable: true, name: 'redirect_url' })
  redirectUrl: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  buyer: User;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;
}
