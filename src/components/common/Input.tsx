import '@components/common/Input.css';

import clsx from 'clsx';
import {type ChangeEventHandler, type HTMLProps} from 'react';

interface InputProps extends Omit<HTMLProps<HTMLInputElement>, 'type'> {
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number | readonly string[] | string | undefined;
}

export default function Input({className, onChange, value, ...props}: InputProps) {
  return <div className={clsx('Input', className)}>
    <input onChange={onChange} type={'text'} value={value} {...props} />
  </div>;
}
