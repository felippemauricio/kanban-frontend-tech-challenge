import { useMutation, useQueryClient } from '@tanstack/react-query';

import axiosClient from '../base';
import { QUERY_KEY as BOARD_COLUMN_TASKS_QUERY_KEY } from '../columns/useGetBoardColumnTasks';

import type { UUID } from '../../types';
import type { BoardTaskStatusEnum } from './types/BoardTaskStatusEnum';
import type { Task } from '../../types/tasks';

const deleteBoardTask = async (boardId: UUID, taskId: UUID): Promise<void> => {
  await axiosClient.delete(`/boards/${boardId}/tasks/${taskId}`);
};

export function useTaskDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boardId,
      taskId,
      status: _status,
    }: {
      boardId: UUID;
      taskId: UUID;
      status: BoardTaskStatusEnum;
    }) => {
      return await deleteBoardTask(boardId, taskId);
    },

    onSuccess: async (_data, { boardId, taskId, status }) => {
      await queryClient.cancelQueries({
        queryKey: [BOARD_COLUMN_TASKS_QUERY_KEY, boardId],
      });

      const previousColumnDataNoUpdated: Record<string, Task> = (await queryClient.getQueryData<
        Record<UUID, Task>
      >([BOARD_COLUMN_TASKS_QUERY_KEY, boardId, status])) as Record<string, Task>;

      const previousColumnDataUpdated: Record<string, Task> = { ...previousColumnDataNoUpdated };
      delete previousColumnDataUpdated[taskId];

      await queryClient.setQueryData(
        [BOARD_COLUMN_TASKS_QUERY_KEY, boardId, status],
        previousColumnDataUpdated
      );
    },
  });
}
