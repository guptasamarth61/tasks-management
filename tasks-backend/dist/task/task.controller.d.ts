import { TaskService } from './task.service';
import { Task } from './task.entity';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(task: Task): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskSummary(): Promise<any>;
    getTaskById(id: string): Promise<Task>;
    updateTask(id: string, task: Task): Promise<Task>;
    deleteTask(id: string): Promise<void>;
}
