export enum TaskPriority {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  priority: TaskPriority;
  completed: boolean;
}
