import { ReactNode } from 'react';

export interface ModalProps {
  show?: boolean;
  modalBodyClassName?: string;
  onClickOutsideModalBody?(): void;
  children: ReactNode;
}
