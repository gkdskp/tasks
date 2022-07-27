import { Resolver, Query, Args, ID, Mutation } from "@nestjs/graphql"
import { TaskService } from "./task.service";
import { TaskDto } from "./task.dto";
import { TaskModel } from "./task.model";
import { TaskInput } from "./task.input";

@Resolver('Task')
export class TaskResolver {
    constructor(
        private taskService: TaskService
    ) {}

    @Query(returns => [TaskModel])
    async getTasks() {
        return this.taskService.findAll();
    }

    @Query(returns => TaskModel)
    async getTaskById(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.findOne(id);
    }

    @Mutation(returns => TaskModel)
    async createTask(
        @Args('name', { type: () => String }) name: string,
        @Args('description', { type: () => String }) description: string
    ) {
        return this.taskService.create(name, description);
    }

    @Mutation(returns => TaskModel)
    async updateTask(
        @Args('id', { type: () => ID }) id: string,
        @Args('patch') patch: TaskInput
    ) {
        return await this.taskService.update(id, patch);
    }

    @Mutation(returns => TaskModel)
    async deleteTask(
        @Args('id', { type: () => ID }) id: string
    ) {
        return await this.taskService.delete(id);
    }
}