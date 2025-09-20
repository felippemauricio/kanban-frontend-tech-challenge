import { useState } from 'react';

import type { Task } from '../../../../types/tasks';

export interface UseDeleteTaskModal {
  isOpen: boolean;
  handleOpen: (task: Task) => void;
  handleClose: () => void;
  initialData: Task | undefined;
}

export function useDeleteTaskModal(): UseDeleteTaskModal {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<Task | undefined>(undefined);

  const handleOpen = (task: Task) => {
    setInitialData(task);
    setIsOpen(true);
  };

  const handleClose = () => {
    setInitialData(undefined);
    setIsOpen(false);
  };

  return {
    isOpen,
    handleOpen,
    handleClose,
    initialData,
  };
}
