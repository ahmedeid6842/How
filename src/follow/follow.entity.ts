import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
export class Follow {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.follows)
    user: User;

    @ManyToOne(() => User, user => user.follows)
    follower: User;
}