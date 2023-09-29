import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
@Unique(["user", "follower"])
export class Follow {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.follows)
    user: User;

    @ManyToOne(() => User, user => user.follows)
    follower: User;

    @CreateDateColumn()
    createdAt: Date;
}