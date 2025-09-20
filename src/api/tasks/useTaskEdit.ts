import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosClient from '../base';
import { QUERY_KEY as BOARD_COLUMN_TASKS_QUERY_KEY } from '../columns/useGetBoardColumnTasks';

import type { UUID } from '../../types';
import type { TaskResponse } from './types/TaskResponse';
import type { TaskRequest } from './types/TaskRequest';
import type { Task } from '../../types/tasks';

const putBoardTask = async (
  boardId: UUID,
  taskId: UUID,
  request: TaskRequest
): Promise<TaskResponse> => {
  const { data } = await axiosClient.put<Task>(`/boards/${boardId}/tasks/${taskId}`, request);
  return data;
};

export function useTaskEdit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boardId,
      taskId,
      request,
    }: {
      boardId: UUID;
      taskId: UUID;
      request: TaskRequest;
    }) => {
      return await putBoardTask(boardId, taskId, request);
    },

    onSuccess: async (updatedTask, { boardId }) => {
      const previousColumnDataNoUpdated: Record<string, Task> = (await queryClient.getQueryData<
        Record<UUID, Task>
      >([BOARD_COLUMN_TASKS_QUERY_KEY, boardId, updatedTask.status])) as Record<string, Task>;

      const previousColumnDataUpdated: Record<string, Task> = { ...previousColumnDataNoUpdated };
      previousColumnDataUpdated[updatedTask.id] = {
        ...updatedTask,
        syncStatus: 'synced',
      } as Task;

      await queryClient.setQueryData(
        [BOARD_COLUMN_TASKS_QUERY_KEY, boardId, updatedTask.status],
        previousColumnDataUpdated
      );
    },
  });
}
