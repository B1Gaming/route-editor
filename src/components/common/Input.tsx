import '@components/common/Input.css';

import clsx from 'clsx';
import { type ChangeEventHandler, type FC, type HTMLProps } from 'react';

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number | readonly string[] | string | undefined;
}

const Input: FC<InputProps> = ({ className, onChange, value, ...props }) => {
  return <div className={clsx('Input', className)}>
    <input onChange={onChange} type={'text'} value={value} {...props} />
  </div>;
};

export default Input;
