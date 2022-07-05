import { ReactNode } from 'react';

export interface PopoverProps {
  content: ReactNode;
  position: 'bottomleft' | 'bottomright';
  popoverBodyClassName?: string;
  controlShow?: boolean;
  onClick?(): void;
  children: ReactNode;
}

export interface PopoverChildrenPosition {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export interface PopoverState {
  show: boolean;
  childrenPosition: PopoverChildrenPosition;
  contentWidth: number;
}
