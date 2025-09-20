import { useMemo, useState } from 'react';

import { useGetBoardColumnTasks } from '../api/columns/useGetBoardColumnTasks';

import { containsIgnoreCase, isEmptyString } from '../utils/stringHelpers';

import type { UUID } from '../types';
import type { BoardTaskStatusEnum } from '../api/tasks/types/BoardTaskStatusEnum';
import type { Task } from '../types/tasks';

export interface UseGetFilteredTasksProps {
  boardId: UUID;
}

export interface UseGetFilteredTasks {
  taskSearch: string;
  onTaskSearch: (taskSearch: string) => void;
  isLoading: boolean;
  error: Error | null;
  data: Record<BoardTaskStatusEnum, Task[]>;
}

export function useGetFilteredTasks({ boardId }: UseGetFilteredTasksProps): UseGetFilteredTasks {
  const [taskSearch, setTaskSearch] = useState<string>('');

  const todoQuery = useGetBoardColumnTasks(boardId, 'toDo' as BoardTaskStatusEnum);
  const inProgressQuery = useGetBoardColumnTasks(boardId, 'inProgress' as BoardTaskStatusEnum);
  const doneQuery = useGetBoardColumnTasks(boardId, 'done' as BoardTaskStatusEnum);

  const isLoading = todoQuery.isLoading || inProgressQuery.isLoading || doneQuery.isLoading;
  const error = todoQuery.error || inProgressQuery.error || doneQuery.error;

  const data = useMemo(() => {
    const filterAndSortTasks = (tasksById: Record<UUID, Task> | undefined) => {
      if (!tasksById) return [];
      const tasks = Object.values(tasksById);

      const filtered = isEmptyString(taskSearch)
        ? tasks
        : tasks.filter(
            (task) =>
              containsIgnoreCase(taskSearch, task.title) ||
              containsIgnoreCase(taskSearch, task.description)
          );

      const syncedTasks = filtered
        .filter((t) => t.syncStatus === 'synced')
        .sort((a, b) => (a.lexoRankId > b.lexoRankId ? 1 : a.lexoRankId < b.lexoRankId ? -1 : 0));

      const syncingTasks = filtered
        .filter(
          (t) => t.syncStatus === 'syncing' && typeof t.syncIndex === 'number' && t.syncIndex >= 0
        )
        .sort((a, b) => (a.syncIndex ?? 0) - (b.syncIndex ?? 0));

      const finalTasks = [...syncedTasks];
      syncingTasks.forEach((task) => {
        const index = task.syncIndex ?? finalTasks.length;
        finalTasks.splice(index, 0, task);
      });

      return finalTasks;
    };

    return {
      toDo: filterAndSortTasks(todoQuery.data),
      inProgress: filterAndSortTasks(inProgressQuery.data),
      done: filterAndSortTasks(doneQuery.data),
    };
  }, [todoQuery.data, inProgressQuery.data, doneQuery.data, taskSearch]);

  const handleOnTaskSearch = (taskSearch: string): void => {
    setTaskSearch(taskSearch);
  };

  return {
    taskSearch,
    onTaskSearch: handleOnTaskSearch,
    isLoading,
    error,
    data,
  };
}
