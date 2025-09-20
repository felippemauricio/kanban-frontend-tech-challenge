import { ArrowPathIcon } from '@heroicons/react/24/outline';

import type { ReactNode } from 'react';

export interface ButtonProps {
  onClick?: () => Promise<void> | void;
  children: ReactNode;
  isLoading?: boolean;
  variant?: 'danger' | 'normal';
  type?: 'button' | 'submit';
}

export function Button({
  children,
  onClick,
  isLoading = false,
  variant = 'normal',
  type = 'button',
}: ButtonProps) {
  const handleOnClick = async () => {
    if (isLoading) return;
    await onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleOnClick}
      disabled={isLoading}
      className={`px-4 py-2 rounded-md inline-flex items-center ${variant === 'normal' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-red-600 text-white hover:bg-red-700'} ${isLoading ? '' : 'cursor-pointer'}`}
    >
      {children}
      {isLoading && <ArrowPathIcon className="h-4 ml-2 w-4 mr-2 animate-spin" />}
    </button>
  );
}
