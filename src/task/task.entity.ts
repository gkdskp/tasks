import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    private id: string;

    @Column()
    private name: string;

    @Column({ nullable: true })
    private description: string;
}