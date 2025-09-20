import { VITE_BOARD_ID, VITE_BOARD_NAME } from '../config';
import { Board } from '../components/Board';

export function KanbanBoardPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Board boardId={VITE_BOARD_ID} boardName={VITE_BOARD_NAME} />
    </div>
  );
}
