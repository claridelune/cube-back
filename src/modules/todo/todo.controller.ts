import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.types';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body() data: Todo) {
    return this.todoService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Todo) {
    return this.todoService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}
