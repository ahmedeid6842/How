import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export abstract class AuditableEntity extends BaseEntity {
    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}
