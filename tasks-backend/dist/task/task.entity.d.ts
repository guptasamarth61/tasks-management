import { ObjectId } from 'typeorm';
export declare enum TaskStatus {
    PENDING = "pending",
    IN_PROGRESS = "in-progress",
    COMPLETED = "completed"
}
export declare class Task {
    _id: ObjectId;
    title: string;
    description: string;
    dueDate: Date;
    status: TaskStatus;
}
