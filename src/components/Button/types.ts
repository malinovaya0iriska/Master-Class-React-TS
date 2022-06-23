export type ButtonsProps = {
  type?: 'primary' | 'default';
  className?: string;
  onClick?: () => void;
  children: string;
};
