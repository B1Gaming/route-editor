import '@components/common/Snackbar.css';

import clsx from 'clsx';

import type {SnackbarData} from '@model/common';

interface SnackbarProps extends SnackbarData {
  isHiding?: boolean;
  onClick: () => void;
}

export default function Snackbar({color = 'primary', isHiding, message, onClick}: SnackbarProps) {
  return <div className={clsx(
      'Snackbar',
      color,
      {hiding: isHiding},
  )} onClick={onClick}>
    <div>{message}</div>
  </div>;
}
