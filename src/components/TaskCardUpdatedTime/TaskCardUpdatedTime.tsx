import { useEffect, useState } from 'react';

import { timeAgo } from '../../utils/dateHelper';

export interface TaskCardUpdatedTimeProps {
  updatedAt: string;
}

export function TaskCardUpdatedTime({ updatedAt }: TaskCardUpdatedTimeProps) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 5_000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return <span>Updated {timeAgo(updatedAt)}</span>;
}
