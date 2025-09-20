import type { UUID } from '../../../types';
import type { BoardTaskStatusEnum } from './BoardTaskStatusEnum';

export interface MoveTaskRequest {
  status: BoardTaskStatusEnum;
  previousTaskId?: UUID;
  nextTaskId?: UUID;
}
