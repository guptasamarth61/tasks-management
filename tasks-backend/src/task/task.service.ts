import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task, TaskStatus } from './task.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(task: Task): Promise<Task> {
    try {
      return await this.taskRepository.save(task);
    } catch (error) {
      console.error('Error creating task:', error);
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async getAllTasks(): Promise<Task[]> {
    try {
      return await this.taskRepository.find();
    } catch (error) {
      console.error('Error getting all tasks:', error);
      throw new InternalServerErrorException('Failed to get all tasks');
    }
  }

  async getTaskById(id: string): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({ where: { _id: new ObjectId(id) } });
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      return task;
    } catch (error) {
      console.error(`Error getting task by ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to get task by ID');
    }
  }

  async updateTask(id: string, task: Task): Promise<Task> {
    try {
      await this.taskRepository.update({ _id: new ObjectId(id) }, task);
      return await this.getTaskById(id);
    } catch (error) {
      console.error(`Error updating task with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to update task');
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const result = await this.taskRepository.delete({ _id: new ObjectId(id) });
      if (result.affected === 0) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
    } catch (error) {
      console.error(`Error deleting task with ID ${id}:`, error);
      throw new InternalServerErrorException('Failed to delete task');
    }
  }

  async getTaskSummary(): Promise<any> {
    try {
      const tasks = await this.taskRepository.find();
      let total = 0;
      const taskStatusMap = {
        [TaskStatus.PENDING]: 0,
        [TaskStatus.IN_PROGRESS]: 0,
        [TaskStatus.COMPLETED]: 0,
      };
      tasks.forEach(task => {
        taskStatusMap[task.status]++;
        total++;
      });
      return {
        total,
        completed: taskStatusMap[TaskStatus.COMPLETED],
        pending: taskStatusMap[TaskStatus.PENDING], 
        inprogress: taskStatusMap[TaskStatus.IN_PROGRESS]
      }
    } catch (error) {
      console.error('Error getting task status:', error);
      throw new InternalServerErrorException('Failed to get task status');
    }
  }
}