import { useQuery } from '@tanstack/react-query';

import axiosClient from '../base';

import type { BoardTaskStatusEnum } from '../tasks/types/BoardTaskStatusEnum';
import type { Task } from '../../types/tasks';
import type { UUID } from '../../types';
import type { TaskResponse } from '../tasks/types/TaskResponse';

const fetchBoardColumnTasks = async (
  boardId: UUID,
  status: BoardTaskStatusEnum
): Promise<TaskResponse[]> => {
  const { data } = await axiosClient.get<TaskResponse[]>(
    `/boards/${boardId}/columns/${status}/tasks`
  );
  return data;
};

const transformTasksArrayToRecord = (tasks: TaskResponse[]): Record<UUID, Task> => {
  const transformed: Record<UUID, Task> = {};

  for (const task of tasks) {
    transformed[task.id] = {
      ...task,
      syncStatus: 'synced',
    };
  }
  return transformed;
};

export const QUERY_KEY: string = 'boardColumnTasks';

export function useGetBoardColumnTasks(boardId: UUID, status: BoardTaskStatusEnum) {
  return useQuery({
    queryKey: [QUERY_KEY, boardId, status],
    queryFn: async () => {
      const tasks = await fetchBoardColumnTasks(boardId, status);
      return transformTasksArrayToRecord(tasks);
    },
    retry: Infinity,
    refetchInterval: 10 * 60 * 1_000, // 10 minutes
  });
}
