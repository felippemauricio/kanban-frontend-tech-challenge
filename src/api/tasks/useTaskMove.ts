import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosClient from '../base';
import { QUERY_KEY as BOARD_COLUMN_TASKS_QUERY_KEY } from '../columns/useGetBoardColumnTasks';

import type { Task } from '../../types/tasks';
import type { UUID } from '../../types';
import type { TaskResponse } from './types/TaskResponse';
import type { MoveTaskRequest } from './types/MoveTaskRequest';
import type { BoardTaskStatusEnum } from './types/BoardTaskStatusEnum';

const fetchBoardColumnTasks = async (
  boardId: UUID,
  taskId: UUID,
  request: MoveTaskRequest
): Promise<TaskResponse> => {
  const { data } = await axiosClient.patch<Task>(
    `/boards/${boardId}/tasks/${taskId}/move`,
    request
  );
  return data;
};

export function useTaskMove() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boardId,
      taskId,
      request,
      previousStatus: _previousStatus,
      newStatusIndex: _newStatusIndex,
    }: {
      boardId: UUID;
      taskId: UUID;
      request: MoveTaskRequest;
      previousStatus: BoardTaskStatusEnum;
      newStatusIndex: number;
    }) => {
      return await fetchBoardColumnTasks(boardId, taskId, request);
    },

    onMutate: async ({
      boardId,
      taskId,
      request,
      previousStatus,
      newStatusIndex,
    }: {
      boardId: UUID;
      taskId: UUID;
      request: MoveTaskRequest;
      previousStatus: BoardTaskStatusEnum;
      newStatusIndex: number;
    }) => {
      await queryClient.cancelQueries({ queryKey: [BOARD_COLUMN_TASKS_QUERY_KEY, boardId] });

      const previousColumnDataNoUpdated: Record<string, Task> = (await queryClient.getQueryData<
        Record<UUID, Task>
      >([BOARD_COLUMN_TASKS_QUERY_KEY, boardId, previousStatus])) as Record<string, Task>;

      const newColumnDataNoUpdated: Record<string, Task> | undefined =
        previousStatus !== request.status
          ? ((await queryClient.getQueryData<Record<UUID, Task>>([
              BOARD_COLUMN_TASKS_QUERY_KEY,
              boardId,
              request.status,
            ])) as Record<string, Task>)
          : undefined;

      if (previousStatus === request.status) {
        const previousColumnDataUpdated: Record<string, Task> = { ...previousColumnDataNoUpdated };
        previousColumnDataUpdated[taskId] = {
          ...(previousColumnDataNoUpdated?.[taskId] || {}),
          syncStatus: 'syncing',
          status: request.status,
          syncIndex: newStatusIndex,
        } as Task;

        await queryClient.setQueryData(
          [BOARD_COLUMN_TASKS_QUERY_KEY, boardId, previousStatus],
          previousColumnDataUpdated
        );
      } else {
        const previousColumnDataUpdated = { ...previousColumnDataNoUpdated };
        const newColumnDataUpdated = { ...newColumnDataNoUpdated };

        newColumnDataUpdated[taskId] = {
          ...(previousColumnDataUpdated?.[taskId] || {}),
          syncStatus: 'syncing',
          status: request.status,
          syncIndex: newStatusIndex,
        } as Task;

        delete previousColumnDataUpdated[taskId];

        await queryClient.setQueryData(
          [BOARD_COLUMN_TASKS_QUERY_KEY, boardId, previousStatus],
          previousColumnDataUpdated
        );
        await queryClient.setQueryData(
          [BOARD_COLUMN_TASKS_QUERY_KEY, boardId, request.status],
          newColumnDataUpdated
        );
      }

      return { previousColumnDataNoUpdated, newColumnDataNoUpdated };
    },

    onError: async (_err, variables, context) => {
      if (context?.previousColumnDataNoUpdated) {
        await queryClient.setQueryData(
          [BOARD_COLUMN_TASKS_QUERY_KEY, variables.boardId, variables.previousStatus],
          context?.previousColumnDataNoUpdated
        );
      }
      if (context?.newColumnDataNoUpdated) {
        await queryClient.setQueryData(
          [BOARD_COLUMN_TASKS_QUERY_KEY, variables.boardId, variables.request.status],
          context?.newColumnDataNoUpdated
        );
      }
    },

    onSuccess: async (data, variables) => {
      const updatedNewColumn = await queryClient.getQueryData<Record<UUID, Task>>([
        BOARD_COLUMN_TASKS_QUERY_KEY,
        variables.boardId,
        data.status,
      ]);

      if (updatedNewColumn) {
        await queryClient.setQueryData(
          [BOARD_COLUMN_TASKS_QUERY_KEY, variables.boardId, data.status],
          {
            ...updatedNewColumn,
            [data.id]: {
              ...data,
              syncStatus: 'synced',
            },
          }
        );
      }
    },
  });
}
