import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { capitalCase } from 'change-case';

import type { TaskSyncStatus } from '../../types/tasks';

export interface TaskCardSyncStatusProps {
  syncStatus: TaskSyncStatus;
}

export function TaskCardSyncStatus({ syncStatus }: TaskCardSyncStatusProps) {
  if (syncStatus === 'syncing') {
    return <ArrowPathIcon className="w-4 h-4 animate-spin text-indigo-500" />;
  }

  return <span>{capitalCase(syncStatus)}</span>;
}
