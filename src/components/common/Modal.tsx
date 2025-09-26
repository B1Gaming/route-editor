import '@components/common/Modal.css';

import type {MouseEvent, MouseEventHandler, ReactNode} from 'react';

import clsx from 'clsx';

interface ModalProps {
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
  onBackdropClick?: MouseEventHandler<HTMLDivElement>;
}

export default function Modal({children, className, noPadding, onBackdropClick}: ModalProps) {
  function handleBackdropClick(e: MouseEvent<HTMLDivElement>) {
    if (onBackdropClick && e.currentTarget === e.target) {
      onBackdropClick(e);
    }
  }

  return <div className={'modal-backdrop'} onClick={handleBackdropClick}>
    <div className={clsx('Modal', {'padded': !noPadding}, className)}>{children}</div>
  </div>;
}
