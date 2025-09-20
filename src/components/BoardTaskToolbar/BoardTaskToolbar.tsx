import type { MouseEvent, MouseEventHandler } from 'react';

export interface BoardTaskToolbarProps {
  onAdd?: () => void;
  isLoading?: boolean;
}

export function BoardTaskToolbar({ onAdd, isLoading = false }: BoardTaskToolbarProps) {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (
    _event: MouseEvent<HTMLButtonElement>
  ) => {
    onAdd?.();
  };

  return (
    <div className="mx-auto max-w-[1100px] px-4 pt-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-600">Quick add:</span>
        <button
          disabled={isLoading}
          onClick={handleOnClick}
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 cursor-pointer"
        >
          + TO DO
        </button>
      </div>
    </div>
  );
}
