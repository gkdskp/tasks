import { ObjectType, ID, Field } from "@nestjs/graphql";

@ObjectType()
export class TaskModel {
    @Field(type => ID)
    id: string;

    @Field({ nullable: false })
    name: string;

    @Field({ nullable: true })
    description?: string;
}