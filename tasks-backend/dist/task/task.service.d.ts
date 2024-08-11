import { Repository } from 'typeorm';
import { Task } from './task.entity';
export declare class TaskService {
    private readonly taskRepository;
    constructor(taskRepository: Repository<Task>);
    createTask(task: Task): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    updateTask(id: string, task: Task): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    getTaskSummary(): Promise<any>;
}
