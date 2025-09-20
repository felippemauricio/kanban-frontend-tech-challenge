import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useTaskCreate } from '../../../api/tasks/useTaskCreate';
import { useTaskEdit } from '../../../api/tasks/useTaskEdit';

import { VITE_BOARD_ID } from '../../../config';

import type { TaskFormData } from './types';
import type { Task } from '../../../types/tasks';
import type { TaskRequest } from '../../../api/tasks/types/TaskRequest';
import { Button } from '../../Button';

export interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Task;
}

const taskSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: yup.string().notRequired().max(200, 'Description cannot exceed 200 characters'),
});

export function AddEditTaskModal({ isOpen, onClose, initialData }: AddEditTaskModalProps) {
  const { mutateAsync: createTaskMutateAsync, isPending: createTaskIsPending } = useTaskCreate();
  const { mutateAsync: editTaskMutateAsync, isPending: editTaskIsPending } = useTaskEdit();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    // @ts-expect-error types
    resolver: yupResolver(taskSchema),
    defaultValues: initialData || { title: '', description: '' },
  });

  const handleOnSubmit = async (request: TaskFormData) => {
    try {
      if (initialData) {
        await editTaskMutateAsync({
          taskId: initialData.id,
          boardId: VITE_BOARD_ID,
          request: request as TaskRequest,
        });
      } else {
        const idempotencyKey = uuid();
        await createTaskMutateAsync({
          boardId: VITE_BOARD_ID,
          request: request as TaskRequest,
          idempotencyKey,
        });
      }
    } finally {
      onClose?.();
      reset({ title: '', description: '' });
    }
  };

  const handleOnClose = async () => {
    if (createTaskIsPending || editTaskIsPending) return;
    onClose?.();
    reset({ title: '', description: '' });
  };

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ title: '', description: '' });
    }
  }, [initialData, reset]);

  return (
    <Dialog as="div" className="relative z-50" open={isOpen} onClose={handleOnClose}>
      <div className="fixed inset-0 backdrop-blur-sm bg-black/10" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 text-left shadow-xl">
          <DialogTitle className="text-lg font-medium text-gray-900 mb-4">
            {initialData ? 'Edit Task' : 'Add Task'}
          </DialogTitle>

          <form
            onSubmit={handleSubmit(async (data) => {
              await handleOnSubmit({ title: data.title, description: data.description });
            })}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                autoFocus
                type="text"
                {...register('title')}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.description && (
                <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleOnClose}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <Button type="submit" isLoading={createTaskIsPending || editTaskIsPending}>
                {initialData ? 'Save' : 'Add'}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
