import { User } from "src/graphql";
import { UserEntity } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class TaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    public userId: string;

    @ManyToOne(() => UserEntity)
    user: User;
}