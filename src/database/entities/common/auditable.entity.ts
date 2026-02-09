import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class AuditableEntity extends BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
