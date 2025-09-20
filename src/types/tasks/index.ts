import type { TaskResponse } from '../../api/tasks/types/TaskResponse';

export type Task = TaskResponse & {
  syncStatus: TaskSyncStatus;
  syncIndex?: number;
};

export type TaskSyncStatus = 'synced' | 'syncing';
