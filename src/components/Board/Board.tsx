import { capitalCase } from 'change-case';

import { BoardColumn } from '../BoardColumn';
import { BoardHeader } from '../BoardHeader';
import { BoardTaskToolbar } from '../BoardTaskToolbar';
import { AddEditTaskModal } from '../Modals/AddEditTaskModal/AddEditTaskModal';

import { useGetFilteredTasks } from '../../hooks/useGetFilteredTasks';
import { useGetColumns } from '../../api/columns/useGetColumns';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { useAddEditTaskModal } from '../Modals/AddEditTaskModal';
import { DeleteTaskModal, useDeleteTaskModal } from '../Modals/DeleteTaskModal';
import useGetSkeletonTasks from '../../hooks/useGetSkeletonTasks';

export interface BoardProps {
  boardId: string;
  boardName: string;
}

export function Board({ boardId, boardName }: BoardProps) {
  const boardColumns = useGetColumns();
  const { data: skeletonTasks } = useGetSkeletonTasks({ boardId });
  const {
    taskSearch,
    onTaskSearch,
    isLoading,
    data: filteredTasks,
  } = useGetFilteredTasks({
    boardId,
  });

  const { isDragging, onDragStart, onDragEnd, onDrop } = useDragAndDrop();
  const {
    isOpen: addEditTaskModalIsOpen,
    initialData: addEditTaskModalInitialData,
    handleClose: addEditTaskModalHandleClose,
    handleOpen: addEditTaskModalHandleOpen,
  } = useAddEditTaskModal();
  const {
    isOpen: deleteTaskModalIsOpen,
    initialData: deleteTaskModalInitialData,
    handleClose: deleteTaskModalHandleClose,
    handleOpen: deleteTaskModalHandleOpen,
  } = useDeleteTaskModal();

  return (
    <>
      <BoardHeader
        isLoading={isLoading}
        boardName={boardName}
        taskSearch={taskSearch}
        onTaskSearch={onTaskSearch}
      />
      <BoardTaskToolbar isLoading={isLoading} onAdd={addEditTaskModalHandleOpen} />

      <main className="mx-auto grid max-w-[1100px] grid-cols-1 gap-2 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {boardColumns.map((column) => (
          <BoardColumn
            key={column}
            boardId={boardId}
            column={column}
            title={capitalCase(column)}
            tasks={isLoading ? skeletonTasks[column] : filteredTasks[column]}
            isLoading={isLoading}
            isDragging={isDragging}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
            onEdit={addEditTaskModalHandleOpen}
            onDelete={deleteTaskModalHandleOpen}
          />
        ))}
      </main>

      <AddEditTaskModal
        isOpen={addEditTaskModalIsOpen}
        onClose={addEditTaskModalHandleClose}
        initialData={addEditTaskModalInitialData}
      />

      {deleteTaskModalInitialData && (
        <DeleteTaskModal
          isOpen={deleteTaskModalIsOpen}
          onClose={deleteTaskModalHandleClose}
          task={deleteTaskModalInitialData}
        />
      )}
    </>
  );
}
