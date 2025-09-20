import { useState } from 'react';
import { camelCase } from 'change-case';

import { useTaskMove } from '../api/tasks/useTaskMove';

import type {
  DragAndDropPayload,
  DragEndHandler,
  DragStartHandler,
  DropHandler,
} from '../types/dragAnDrop';
import type { Task } from '../types/tasks';
import type { UUID } from '../types';
import type { BoardTaskStatusEnum } from '../api/tasks/types/BoardTaskStatusEnum';

export interface UseDragAndDrop {
  isDragging: boolean;
  onDragStart: DragStartHandler;
  onDragEnd: DragEndHandler;
  onDrop: DropHandler;
}

export function useDragAndDrop(): UseDragAndDrop {
  const { mutateAsync: taskMoveMutateAsync } = useTaskMove();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragStart: DragStartHandler =
    (boardId: UUID, task: Task, fromStatus: BoardTaskStatusEnum) =>
    async (event: React.DragEvent<HTMLElement>) => {
      setIsDragging(true);
      event.dataTransfer.effectAllowed = 'move';
      const payload = JSON.stringify({
        boardId,
        task,
        fromStatus,
      } as DragAndDropPayload);
      event.dataTransfer.setData('application/json', payload);
    };

  const handleDragEnd: DragEndHandler = () => async (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop: DropHandler =
    (
      boardId: UUID,
      toStatus: BoardTaskStatusEnum,
      newStatusIndex: number,
      previousTaskId?: UUID,
      nextTaskId?: UUID
    ) =>
    async (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const json = event.dataTransfer.getData('application/json');
      const payload: DragAndDropPayload = JSON.parse(json);
      if (payload?.task) {
        taskMoveMutateAsync({
          boardId,
          taskId: payload.task.id,
          request: {
            status: camelCase(toStatus) as BoardTaskStatusEnum,
            previousTaskId,
            nextTaskId,
          },
          previousStatus: camelCase(payload.fromStatus) as BoardTaskStatusEnum,
          newStatusIndex,
        });
      }
    };

  return {
    isDragging,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDrop: handleDrop,
  };
}
