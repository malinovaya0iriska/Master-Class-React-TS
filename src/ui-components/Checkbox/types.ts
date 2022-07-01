import { ReactNode } from 'react';

export interface CheckboxState {
  value: boolean;
}

export interface CheckboxProps {
  initialValue?: boolean;
  onChange(value: boolean): void;
  children?: ReactNode;
}
