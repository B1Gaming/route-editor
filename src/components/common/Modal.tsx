import '@components/common/Modal.css';

import type { FC, MouseEvent, MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';

interface ModalProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  onBackdropClick?: MouseEventHandler<HTMLDivElement>;
}

const Modal: FC<ModalProps> = ({ children, className, noPadding, onBackdropClick }) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onBackdropClick && e.currentTarget === e.target) {
      onBackdropClick(e);
    }
  };

  return <div className={'modal-backdrop'} onClick={handleBackdropClick}>
    <div className={clsx('Modal', {'padded': !noPadding}, className)}>{children}</div>
  </div>;
};

export default Modal;
