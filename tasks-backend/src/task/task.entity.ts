import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

@Entity()
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsDateString()
  dueDate: Date;

  @Column()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}