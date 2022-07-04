import { ReactNode } from 'react';

export type ButtonType = 'primary' | 'default';

export interface ButtonProps {
  className?: string;
  selected?: boolean;
  type?: ButtonType;
  onClick: () => void;
  children: ReactNode;
}
