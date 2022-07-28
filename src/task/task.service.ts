import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundException } from 'src/common/exceptions/entity-not-found.exception';
import { Repository } from 'typeorm';
import { TaskDto } from './task.dto';
import { TaskEntity } from './task.entity';

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

    async update(id: string, patch: TaskDto) {
        const task = await this.findOne(id);

        if(!task) {
            throw new EntityNotFoundException();
        }

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
