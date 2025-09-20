import type { Task } from '../../types/tasks';

export interface BoardColumnTaskCountProps {
  tasks: Task[];
}

export function BoardColumnTaskCount({ tasks }: BoardColumnTaskCountProps) {
  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
      {tasks.length}
    </span>
  );
}
