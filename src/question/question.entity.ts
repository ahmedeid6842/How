import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    title: string

    @Column()
    description: string
    
    @Column()
    likes_count: number
    
    @CreateDateColumn()
    creation_date: Date
}