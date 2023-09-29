import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/user.entity";

@Entity()
export class Follow {
    @PrimaryGeneratedColumn("uuid")
    id: string;

}