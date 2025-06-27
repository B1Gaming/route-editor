import '@components/common/Snackbar.css';

import clsx from 'clsx';
import { FC } from 'react';

import type { SnackbarData } from '@model/common';

interface SnackbarProps extends SnackbarData {
  isHiding?: boolean;
  onClick: () => void;
}

const Snackbar: FC<SnackbarProps> = ({ color = 'primary', isHiding, message, onClick }) => {
  return <div className={clsx(
    'Snackbar',
    color,
    { hiding: isHiding }
  )} onClick={onClick}>
    <div>{message}</div>
  </div>;
};

export default Snackbar;
