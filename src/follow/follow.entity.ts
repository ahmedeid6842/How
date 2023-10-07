import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
@Unique(["user", "follower"])
export class Follow {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.follows,{ onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => User, user => user.follows,{ onDelete: "CASCADE" })
    follower: User;

    @CreateDateColumn()
    createdAt: Date;
}