import { useState } from 'react';

import type { DragEventHandler, DragEvent } from 'react';

import type { UUID } from '../../types';
import type { BoardTaskStatusEnum } from '../../api/tasks/types/BoardTaskStatusEnum';
import type { DropHandler } from '../../types/dragAnDrop';

export interface BoardColumnDropZoneProps {
  boardId: UUID;
  column: BoardTaskStatusEnum;
  newStatusIndex: number;
  previousTaskId?: UUID;
  nextTaskId?: UUID;

  isDragAndDropColumnActive: boolean;
  isLastDropZone: boolean;

  onDrop?: DropHandler;
}

export function BoardColumnDropZone({
  boardId,
  column,
  newStatusIndex,
  previousTaskId,
  nextTaskId,
  isDragAndDropColumnActive,
  isLastDropZone,
  onDrop,
}: BoardColumnDropZoneProps) {
  const [over, setOver] = useState<boolean>(false);

  const handleDragOver: DragEventHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!over) setOver(true);
  };

  const handleDragLeave: DragEventHandler = (_event: DragEvent<HTMLDivElement>) => setOver(false);

  const handleDrop: DragEventHandler = (event: DragEvent<HTMLDivElement>) => {
    onDrop?.(boardId, column, newStatusIndex, previousTaskId, nextTaskId)?.(event);
    setOver(false);
  };

  return (
    <div className="relative mb-0" onDrop={handleDrop}>
      {isDragAndDropColumnActive && (
        <div
          className={`absolute inset-[-50px] ${isLastDropZone ? 'bottom-[-1000px]' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        />
      )}

      <div
        className={`${
          over
            ? 'h-24 border-2 border-dashed border-indigo-500 bg-indigo-50 rounded-md mt-3 mb-3'
            : isDragAndDropColumnActive
              ? 'mt-3 border-0 border-transparent'
              : 'mt-3 border-0 border-transparent'
        }`}
      />
    </div>
  );
}
