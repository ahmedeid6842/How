import { Check, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["userName"])
@Unique(["email"])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column({ length: 100 })
    email: string

    @Column({ length: 50, name: 'user_name' })
    userName: string

    @Column()
    password: string;
}