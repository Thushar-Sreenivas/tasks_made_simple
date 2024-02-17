// src/state/tasksAtom.ts
import {atom} from 'recoil';
import {Task} from '../types';
import {storage} from '../utils/storage';

// Key for tasks data in storage
const TASKS_STORAGE_KEY = 'tasks';

// Try to load tasks from storage or default to empty array
const defaultTasks = (() => {
  const tasksJson = storage.getString(TASKS_STORAGE_KEY);
  return tasksJson ? (JSON.parse(tasksJson) as Task[]) : [];
})();

export const tasksAtom = atom<Task[]>({
  key: 'tasksAtom',
  default: defaultTasks,
  effects_UNSTABLE: [
    ({onSet}) => {
      onSet(tasks => {
        // Serialize and save tasks whenever they change
        storage.set(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      });
    },
  ],
});
