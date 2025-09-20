import './globals';

import { ApiProvider } from './api/ApiProvider';
import { KanbanBoardPage } from './pages/KanbanBoardPage';

export default function App() {
  return (
    <ApiProvider>
      <KanbanBoardPage />
    </ApiProvider>
  );
}
