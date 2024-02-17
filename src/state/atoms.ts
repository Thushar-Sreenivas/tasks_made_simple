// src/state/tasksAtom.ts
import {atom} from 'recoil';
import {Task} from '../types';

export const tasksAtom = atom<Task[]>({
  key: 'tasksAtom',
  default: [],
});
