import { User } from "src/auth/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ type: "text", nullable: true })
    bio: string;

    @Column({ type: "array", default: [], name: "social_linkes", nullable: true  })
    socialLinks: string[];

    @Column({ type: "array", default: [], name: "interests", nullable: true , length: 10})
    interests: string;

    @Column({default: 0, name: "num_question_asked"})
    numQuestionAsked: number;

    @Column({default: 0, name: "num_question_answered"})
    numQuestionAnswered: number;

    @Column({default: 0, name: "num_followers"})
    numFollowers: number;

    @Column({default: 0, name: "num_following"})
    numFollowing: number;

    @Column({default: 0, name: "num_likes"})
    numLikes: number;

    @OneToOne(() => User, (user) => user.profile)
    user: User;
}
