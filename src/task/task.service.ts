import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { TaskEntity } from './task.entity';
import { TaskInput } from './task.input';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity) private taskRepository: Repository<TaskEntity>
    ) { }

    findAll() {
        return this.taskRepository.find();
    }

    findOne(id: string) {
        return this.taskRepository.findOne(id);
    }

    async create(name: string, description: string) {
        const task = this.taskRepository.create({
            name,
            description
        });

        await task.save();
        return task;
    }

    async update(id: string, patch: TaskInput) {
        const task = await this.findOne(id);

        task.name = patch?.name ?? task.name;
        task.description == patch?.description ?? task.description;

        await task.save();
        return task;
    }

    async delete(id: string) {
        const task = await this.findOne(id);

        await task.remove();

        return task;
    }
}
