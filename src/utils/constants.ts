import {TaskPriority} from '../types';

export type PriorityColors = {
  [key in TaskPriority]: string;
};

export const priorityColors: PriorityColors = {
  [TaskPriority.Low]: '#00E676',
  [TaskPriority.Medium]: '#FFA500',
  [TaskPriority.High]: '#FF1744',
};
