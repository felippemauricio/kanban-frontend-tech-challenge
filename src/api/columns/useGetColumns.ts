import { BoardTaskStatus } from '../tasks/types/BoardTaskStatusEnum';

export function useGetColumns() {
  return [BoardTaskStatus.TO_DO, BoardTaskStatus.IN_PROGRESS, BoardTaskStatus.DONE];
}
