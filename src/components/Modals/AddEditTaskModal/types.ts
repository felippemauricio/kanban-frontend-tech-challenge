import type { Task } from '../../../types/tasks';

export interface TaskFormData {
  title: string;
  description: string | null | undefined;
}

export type OnOpen = (task?: Task | undefined) => void;
