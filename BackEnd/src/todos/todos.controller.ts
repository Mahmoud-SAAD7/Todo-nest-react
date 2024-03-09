/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './database/todo.schema';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    async findAll() {
        return await this.todosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.todosService.findOne(id);
    }

    @Post()
    async createTodos(@Body() todo: Todo) {
        return await this.todosService.create(todo);
    }

    @Put(':id')
    async updateTodos(@Param('id') id: string, @Body() todo: Todo) {
        return await this.todosService.update(id, todo);
    }

    @Delete(':id')
    async deleteTodos(@Param('id') id: string) {
        return await this.todosService.delete(id);
    }

    @Delete()
    async deleteAll() {
        return await this.todosService.deleteAll();
    }
}
