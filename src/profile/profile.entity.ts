import { User } from "src/auth/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 100 })
    name: string;

    @Column({ type: "text", nullable: true })
    bio: string;

    @Column({ type: "simple-array", default: [], name: "social_linkes", nullable: true, array: true })
    socialLinks: string[];

    @Column({ type: "simple-array", default: [], nullable: true, array: true })
    interests: string[];

    @Column({ default: 0, name: "num_question_asked" })
    numQuestionAsked: number;

    @Column({ default: 0, name: "num_question_answered" })
    numQuestionAnswered: number;

    @Column({ default: 0, name: "num_followers" })
    numFollowers: number;

    @Column({ default: 0, name: "num_following" })
    numFollowing: number;

    @Column({ default: 0, name: "num_likes" })
    numLikes: number;

    @Column({ type: "boolean", default: true, name: 'is_public' })
    isPublic: boolean;

    @OneToOne(() => User, (user) => user.profile, { cascade: true })
    @JoinColumn({name:'user_id'})
    user: User;
}
