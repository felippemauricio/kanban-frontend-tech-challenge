import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import type { DragEvent, DragEventHandler } from 'react';

import { TaskCardIconButton } from '../TaskCardIconButton';
import { TaskCardSyncStatus } from '../TaskCardSyncStatus';
import { TaskCardUpdatedTime } from '../TaskCardUpdatedTime';
import { TaskCardSkeleton } from './components/TaskCardSkeleton';

import type { OnClickHandler } from '../TaskCardIconButton';
import type { Task } from '../../types/tasks';
import type { BoardTaskStatusEnum } from '../../api/tasks/types/BoardTaskStatusEnum';
import type { UUID } from '../../types';
import type { DragEndHandler, DragStartHandler } from '../../types/dragAnDrop';

export interface TaskCardProps {
  boardId: UUID;
  column: BoardTaskStatusEnum;
  task: Task;
  isLoading?: boolean;
  isDragging?: boolean;
  onDragStart?: DragStartHandler;
  onDragEnd?: DragEndHandler;
  onEdit?: (task: Task) => void;
  onDelete?: (task: Task) => void;
}

export function TaskCard({
  boardId,
  column,
  task,
  isLoading = false,
  isDragging = false,
  onDragStart,
  onDragEnd,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const handleOnDragStart: DragEventHandler = async (event: DragEvent<HTMLElement>) => {
    await onDragStart?.(boardId, task, column)?.(event);
  };

  const handleOnDragEnd: DragEventHandler = async (event: DragEvent<HTMLElement>) => {
    await onDragEnd?.()?.(event);
  };

  const handleOnEdit: OnClickHandler = async () => {
    await onEdit?.(task);
  };

  const handleOnDelete: OnClickHandler = async () => {
    await onDelete?.(task);
  };

  if (isLoading) {
    return <TaskCardSkeleton />;
  }

  return (
    <article
      draggable
      onDragStart={handleOnDragStart}
      onDragEnd={handleOnDragEnd}
      className={`${!isDragging && 'group '} cursor-grab rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow mb-0`}
    >
      <div className="flex justify-between items-start min-h-[24px]">
        <h3 className="text-sm font-medium">{task.title}</h3>

        {!isDragging && (
          <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <TaskCardIconButton
              icon={<PencilIcon className="h-4 w-4 text-slate-500" />}
              onClick={handleOnEdit}
            />
            <TaskCardIconButton
              icon={<TrashIcon className="h-4 w-4 text-red-500" />}
              onClick={handleOnDelete}
            />
          </div>
        )}
      </div>

      {!!task.description && (
        <p className="mt-1 line-clamp-2 text-xs text-slate-600">{task.description}</p>
      )}

      <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
        <TaskCardUpdatedTime updatedAt={task.updatedAt} />
        <TaskCardSyncStatus syncStatus={task.syncStatus} />
      </div>
    </article>
  );
}
