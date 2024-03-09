/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { Todo } from './database/todo.schema';
import {  InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
    constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

    async findAll(): Promise<Todo[]> {
        return await this.todoModel.find().exec();
    }

    async findOne(_id: string): Promise<Todo> {
        return await this.todoModel.findById(_id).exec();
    }

    async create(todo: Todo): Promise<Todo> {
        const createdTodo = new this.todoModel(todo);
        return await createdTodo.save();
    }

    async update(_id: string, todo: Todo): Promise<Todo> {
        return await this.todoModel.findByIdAndUpdate(_id, todo, { new: true });
    }

    async delete(_id: string): Promise<Todo> {
        return await this.todoModel.findByIdAndDelete(_id);
    }

    async deleteAll() {
        return await this.todoModel.deleteMany({});
    }
}