export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}
