import type { UUID } from '../../../types';

export interface BoardResponse {
  id: UUID;
  name: string;
  createdAt: string;
  updatedAt: string;
}
