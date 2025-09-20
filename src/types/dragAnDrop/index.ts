import type { UUID } from '..';
import type { BoardTaskStatusEnum } from '../../api/tasks/types/BoardTaskStatusEnum';
import type { Task } from '../tasks';

export type DragAndDropPayload = {
  boardId: UUID;
  task: Task;
  fromStatus: BoardTaskStatusEnum;
};

export type DragStartHandler = (
  boardId: UUID,
  task: Task,
  fromStatus: BoardTaskStatusEnum
) => (e: React.DragEvent<HTMLElement>) => Promise<void> | void;

export type DragEndHandler = () => (e: React.DragEvent<HTMLElement>) => Promise<void> | void;

export type DropHandler = (
  boardId: UUID,
  toStatus: BoardTaskStatusEnum,
  newStatusIndex: number,
  previousTaskId?: UUID,
  nextTaskId?: UUID
) => (e: React.DragEvent<HTMLElement>) => Promise<void> | void;
