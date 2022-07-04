import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export type ButtonType = 'primary' | 'default';

export interface ButtonProps {
  className?: string;
  selected?: boolean;
  styleType?: ButtonType;
  onClick: () => void;
  // children: ReactNode;
}

export type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
