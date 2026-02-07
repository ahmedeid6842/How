import { Entity, ManyToOne, Unique } from 'typeorm';
import { User } from './user.entity';
import { AuditableEntity } from './common';

@Entity()
@Unique(['user', 'follower'])
export class Follow extends AuditableEntity {
  @ManyToOne(() => User, (user) => user.follows, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => User, (user) => user.follows, { onDelete: 'CASCADE' })
  follower: User;
}
