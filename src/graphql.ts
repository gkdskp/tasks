
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    admin = "admin",
    user = "user"
}

export interface TaskInput {
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface UserInput {
    name: string;
    password: string;
    email: string;
    role: Role;
}

export interface Task {
    id: string;
    name: string;
    description?: Nullable<string>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role?: Nullable<Role>;
}

export interface Message {
    message: string;
}

export interface IQuery {
    getTasks(): Nullable<Task>[] | Promise<Nullable<Task>[]>;
    getTaskById(id: string): Nullable<Task> | Promise<Nullable<Task>>;
    getUsers(): Nullable<User>[] | Promise<Nullable<User>[]>;
    getUserById(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createTask(name: string, description?: Nullable<string>): Nullable<Task> | Promise<Nullable<Task>>;
    updateTask(id: string, patch?: Nullable<TaskInput>): Nullable<Task> | Promise<Nullable<Task>>;
    deleteTask(id: string): Nullable<Message> | Promise<Nullable<Message>>;
    createUser(user: UserInput): User | Promise<User>;
    makeAdmin(id: string): Nullable<User> | Promise<Nullable<User>>;
    makeUser(id: string): Nullable<User> | Promise<Nullable<User>>;
    deleteUser(id: string): Nullable<Message> | Promise<Nullable<Message>>;
}

type Nullable<T> = T | null;
