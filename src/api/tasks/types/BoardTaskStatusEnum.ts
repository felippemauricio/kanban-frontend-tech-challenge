export const BoardTaskStatus = {
  TO_DO: 'toDo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done',
} as const;

export type BoardTaskStatusEnum = (typeof BoardTaskStatus)[keyof typeof BoardTaskStatus];
