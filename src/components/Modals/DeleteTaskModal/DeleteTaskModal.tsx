import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

import { useTaskDelete } from '../../../api/tasks/useTaskDelete';

import { Button } from '../../Button';
import { VITE_BOARD_ID } from '../../../config';

import type { Task } from '../../../types/tasks';

export interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export function DeleteTaskModal({ isOpen, onClose, task }: DeleteTaskModalProps) {
  const { mutateAsync: deleteTaskMutateAsync, isPending } = useTaskDelete();

  const handleOnConfirm = async () => {
    try {
      await deleteTaskMutateAsync({ taskId: task.id, status: task.status, boardId: VITE_BOARD_ID });
    } finally {
      onClose?.();
    }
  };

  const handleOnClose = async () => {
    if (isPending) return;
    onClose?.();
  };

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={handleOnClose}>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/10" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-xl">
          <DialogTitle className="text-lg font-medium text-gray-900 mb-4">Delete Task</DialogTitle>

          <p className="text-sm text-gray-700 mb-6">
            Are you sure you want to delete{' '}
            <span className="font-semibold">{task.title || 'this task'}</span>? This action cannot
            be undone.
          </p>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleOnClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <Button onClick={handleOnConfirm} isLoading={isPending} variant="danger">
              Delete
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
