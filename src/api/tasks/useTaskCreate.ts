import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosClient from '../base';
import { QUERY_KEY as BOARD_COLUMN_TASKS_QUERY_KEY } from '../columns/useGetBoardColumnTasks';

import type { UUID } from '../../types';
import type { TaskResponse } from './types/TaskResponse';
import type { TaskRequest } from './types/TaskRequest';
import type { Task } from '../../types/tasks';

const createBoardTask = async (
  boardId: UUID,
  request: TaskRequest,
  idempotencyKey?: string
): Promise<TaskResponse> => {
  const { data } = await axiosClient.post<TaskResponse>(`/boards/${boardId}/tasks`, request, {
    headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined,
  });
  return data;
};

export function useTaskCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boardId,
      request,
      idempotencyKey,
    }: {
      boardId: UUID;
      request: TaskRequest;
      idempotencyKey?: string;
    }) => {
      return await createBoardTask(boardId, request, idempotencyKey);
    },

    onSuccess: async (newTask, { boardId }) => {
      const previousColumnDataNoUpdated: Record<string, Task> = (await queryClient.getQueryData<
        Record<UUID, Task>
      >([BOARD_COLUMN_TASKS_QUERY_KEY, boardId, newTask.status])) as Record<string, Task>;

      const previousColumnDataUpdated: Record<string, Task> = { ...previousColumnDataNoUpdated };
      previousColumnDataUpdated[newTask.id] = {
        ...newTask,
        syncStatus: 'synced',
      } as Task;

      await queryClient.setQueryData(
        [BOARD_COLUMN_TASKS_QUERY_KEY, boardId, newTask.status],
        previousColumnDataUpdated
      );
    },
  });
}
