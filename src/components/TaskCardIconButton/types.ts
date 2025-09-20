import type { MouseEvent } from 'react';

export type OnClickHandler = (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
