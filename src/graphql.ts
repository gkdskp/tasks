
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface TaskInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface Task {
    id: string;
    name: string;
    description?: Nullable<string>;
}

export interface IQuery {
    getTasks(): Nullable<Task>[] | Promise<Nullable<Task>[]>;
    getTaskById(id: string): Nullable<Task> | Promise<Nullable<Task>>;
}

export interface IMutation {
    createTask(name: string, description?: Nullable<string>): Nullable<Task> | Promise<Nullable<Task>>;
    updateTask(id: string, patch?: Nullable<TaskInput>): Nullable<Task> | Promise<Nullable<Task>>;
    deleteTask(id: string): Nullable<Task> | Promise<Nullable<Task>>;
}

type Nullable<T> = T | null;
