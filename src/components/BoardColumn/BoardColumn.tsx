import React, { useState, type DragEvent, type DragEventHandler } from 'react';

import { BoardColumnDropZone } from '../BoardColumnDropZone';
import { TaskCard } from '../TaskCard';
import { BoardColumnTaskCount } from '../BoardColumnTaskCount';

import type { UUID } from '../../types';
import type { Task } from '../../types/tasks';
import type { BoardTaskStatusEnum } from '../../api/tasks/types/BoardTaskStatusEnum';
import type { DragEndHandler, DragStartHandler, DropHandler } from '../../types/dragAnDrop';
import type { OnOpen as AddEditTaskModalOnOpen } from '../Modals/AddEditTaskModal';
import type { OnOpen as DeleteTaskModalOnOpen } from '../Modals/DeleteTaskModal';

export interface BoardColumnProps {
  boardId: string;
  title: string;
  column: BoardTaskStatusEnum;
  tasks: Task[];
  isLoading?: boolean;
  isDragging?: boolean;
  onDragStart?: DragStartHandler;
  onDragEnd?: DragEndHandler;
  onDrop?: DropHandler;
  onEdit?: AddEditTaskModalOnOpen;
  onDelete?: DeleteTaskModalOnOpen;
}

export function BoardColumn({
  boardId,
  title,
  column,
  tasks,
  isLoading = false,
  isDragging = false,
  onDrop,
  onDragStart,
  onDragEnd,
  onEdit,
  onDelete,
}: BoardColumnProps) {
  const [isDragAndDropColumnActive, setDragAndDropColumnActive] = useState<boolean>(false);

  const handleOnDragEnter: DragEventHandler = async (_event: DragEvent<HTMLElement>) => {
    setDragAndDropColumnActive(true);
  };

  const handleOnDragLeave: DragEventHandler = async (event: DragEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      setDragAndDropColumnActive(false);
    }
  };

  const handleDrop: DropHandler =
    (
      boardId: UUID,
      toStatus: BoardTaskStatusEnum,
      newStatusIndex: number,
      previousTaskId?: UUID,
      nextTaskId?: UUID
    ) =>
    async (event: DragEvent<HTMLElement>) => {
      await onDrop?.(boardId, toStatus, newStatusIndex, previousTaskId, nextTaskId)?.(event);
      setDragAndDropColumnActive(false);
    };

  return (
    <section
      className="flex w-full min-h-[70vh] max-w-[328px] flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
    >
      <header className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">{title}</h2>
          <BoardColumnTaskCount tasks={tasks} />
        </div>
      </header>

      <div className="flex-1 space-y-2">
        {!isLoading && (
          <BoardColumnDropZone
            key={`dropzone-${boardId}-${column}-undefined-${tasks?.[0]?.id ?? 'undefined'}`}
            boardId={boardId}
            column={column}
            newStatusIndex={0}
            previousTaskId={undefined}
            nextTaskId={tasks?.[0]?.id}
            isDragAndDropColumnActive={isDragAndDropColumnActive}
            isLastDropZone={tasks.length === 0}
            onDrop={handleDrop}
          />
        )}
        {tasks.map((task, index) => (
          <React.Fragment key={`fragment-${boardId}-${column}-${task.id}`}>
            <TaskCard
              key={`task-${boardId}-${column}-${task.id}`}
              boardId={boardId}
              column={column}
              task={task}
              isLoading={isLoading}
              isDragging={isDragging}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              onEdit={onEdit}
              onDelete={onDelete}
            />
            {!isLoading && (
              <BoardColumnDropZone
                key={`dropzone-${boardId}-${column}-${task.id}-${tasks?.[index + 1]?.id ?? 'undefined'}`}
                boardId={boardId}
                column={column}
                newStatusIndex={index + 1}
                previousTaskId={task.id}
                nextTaskId={tasks?.[index + 1]?.id}
                isDragAndDropColumnActive={isDragAndDropColumnActive}
                isLastDropZone={index === tasks.length - 1}
                onDrop={handleDrop}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
