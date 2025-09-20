import { TaskSearch } from '../TaskSearch';

export interface BoardHeaderProps {
  boardName: string;
  isLoading?: boolean;
  taskSearch: string;
  onTaskSearch: (taskSearch: string) => void;
}

export function BoardHeader({
  boardName,
  isLoading = false,
  taskSearch,
  onTaskSearch,
}: BoardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b bg-white px-4 py-3 shadow-sm">
      <h1 className="text-xl font-semibold">{boardName}</h1>
      <TaskSearch isLoading={isLoading} taskSearch={taskSearch} onTaskSearch={onTaskSearch} />
    </header>
  );
}
