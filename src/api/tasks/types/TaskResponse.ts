import type { UUID } from '../../../types';
import type { BoardTaskStatusEnum } from './BoardTaskStatusEnum';

export interface TaskResponse {
  id: UUID;
  boardId: UUID;
  title: string;
  description?: string;
  status: BoardTaskStatusEnum;
  lexoRankId: string;
  createdAt: string;
  updatedAt: string;
}
