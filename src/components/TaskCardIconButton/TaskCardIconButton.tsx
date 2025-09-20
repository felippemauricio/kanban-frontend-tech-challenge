import type { MouseEvent, MouseEventHandler, ReactElement } from 'react';

import type { OnClickHandler } from './types';

export interface TaskCardIconButtonProps {
  icon: ReactElement;
  onClick: OnClickHandler;
}

export function TaskCardIconButton({ icon, onClick }: TaskCardIconButtonProps) {
  const handleOnClick: MouseEventHandler<HTMLButtonElement> = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    await onClick(event);
  };

  return (
    <button className="p-1 rounded cursor-pointer hover:bg-slate-100" onClick={handleOnClick}>
      {icon}
    </button>
  );
}
