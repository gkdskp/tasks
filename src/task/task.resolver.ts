import { Resolver, Query, Args, ID, Mutation } from "@nestjs/graphql"
import { TaskService } from "./task.service";
import { TaskInput } from "../graphql";
import { TaskDto } from "./task.dto";
import { UseFilters } from "@nestjs/common";
import { HttpExceptionFilter } from "src/common/exceptions/http-exception.filter";

@Resolver('Task')
export class TaskResolver {
    constructor(
        private taskService: TaskService
    ) {}

    @Query()
    async getTasks() {
        return this.taskService.findAll();
    }

    @Query()
    async getTaskById(@Args('id', { type: () => ID }) id: string) {
        return this.taskService.findOne(id);
    }

    @Mutation()
    async createTask(
        @Args('name', { type: () => String }) name: string,
        @Args('description', { type: () => String }) description: string
    ) {
        return this.taskService.create(name, description);
    }

    @Mutation()
    @UseFilters(HttpExceptionFilter)
    async updateTask(
        @Args('id', { type: () => ID }) id: string,
        @Args('patch') patch: TaskDto
    ) {
        return await this.taskService.update(id, patch);
    }

    @Mutation()
    async deleteTask(
        @Args('id', { type: () => ID }) id: string
    ) {
        return await this.taskService.delete(id);
    }
}