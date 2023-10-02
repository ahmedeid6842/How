import { User } from "src/auth/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionLikes } from "./like.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column({ default: 0 })
    likes_count: number

    @CreateDateColumn()
    creation_date: Date

    @ManyToOne(() => User, user => user.questions)
    author: User

    @OneToMany(() => QuestionLikes, (likes) => likes.question)
    likes: QuestionLikes[]

}