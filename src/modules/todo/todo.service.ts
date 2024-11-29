import { Repository } from 'typeorm';
import { Todo } from './todo.types';
import { TodoEntity } from './todo.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  findOne(id: string) {
    return this.todoRepository.findOneBy({ id });
  }

  findAll() {
    return this.todoRepository.find();
  }

  create(data: Todo) {
    const newRecord = this.todoRepository.create(data);
    return this.todoRepository.save(newRecord);
  }

  async update(id: string, data: Todo) {
    await this.todoRepository.update(id, data);
    return this.todoRepository.findOne({ where: { id } });
  }

  async delete(id: string) {
    await this.todoRepository.delete(id);
  }
}
