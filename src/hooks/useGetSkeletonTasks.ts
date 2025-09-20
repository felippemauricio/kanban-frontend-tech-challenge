import { v4 as uuid } from 'uuid';

import { BoardTaskStatus } from '../api/tasks/types/BoardTaskStatusEnum';

import type { BoardTaskStatusEnum } from '../api/tasks/types/BoardTaskStatusEnum';
import type { UUID } from '../types';
import type { Task } from '../types/tasks';

export interface UseGetSkeletonTasks {
  data: Record<BoardTaskStatusEnum, Task[]>;
}

export interface UseGetSkeletonTasksProps {
  boardId: UUID;
}

export function useGetSkeletonTasks({ boardId }: UseGetSkeletonTasksProps): UseGetSkeletonTasks {
  const getMockTask = (status: BoardTaskStatusEnum) => {
    return {
      id: uuid(),
      boardId,
      title: 'Skeleton Task',
      description: 'Skeleton Description',
      status,
      lexoRankId: '0|hzzzzz:',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Task;
  };

  return {
    data: {
      [BoardTaskStatus.TO_DO]: [
        getMockTask(BoardTaskStatus.TO_DO),
        getMockTask(BoardTaskStatus.TO_DO),
        getMockTask(BoardTaskStatus.TO_DO),
        getMockTask(BoardTaskStatus.TO_DO),
        getMockTask(BoardTaskStatus.TO_DO),
      ],
      [BoardTaskStatus.IN_PROGRESS]: [
        getMockTask(BoardTaskStatus.IN_PROGRESS),
        getMockTask(BoardTaskStatus.IN_PROGRESS),
      ],
      [BoardTaskStatus.DONE]: [
        getMockTask(BoardTaskStatus.DONE),
        getMockTask(BoardTaskStatus.DONE),
        getMockTask(BoardTaskStatus.DONE),
      ],
    },
  };
}

export default useGetSkeletonTasks;
