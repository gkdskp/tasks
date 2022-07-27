import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class TaskInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;
}