import type { ChangeEvent, ChangeEventHandler } from 'react';

export interface TaskSearchProps {
  taskSearch: string;
  isLoading?: boolean;
  onTaskSearch?: (taskSearch: string) => void;
}

export function TaskSearch({ taskSearch, isLoading = false, onTaskSearch }: TaskSearchProps) {
  const handleOnChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onTaskSearch?.(e.target.value);
  };

  return (
    <input
      disabled={isLoading}
      value={taskSearch}
      onChange={handleOnChange}
      placeholder="Search tickets"
      className="ml-auto w-64 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
    />
  );
}
