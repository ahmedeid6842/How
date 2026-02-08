import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { BaseRepository } from './base.repository';

@Injectable()
export class PaymentRepository extends BaseRepository<Payment> {
  constructor(@InjectRepository(Payment) repository: Repository<Payment>) {
    super(repository);
  }

  async findByProviderTransactionId(
    transactionId: string,
  ): Promise<Payment | null> {
    return this.findOne({
      where: { providerTransactionId: transactionId } as any,
    });
  }
}
