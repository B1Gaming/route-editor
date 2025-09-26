import '@components/common/Icon.css';

import clsx from 'clsx';
import {type HTMLProps} from 'react';

interface IconProps extends HTMLProps<HTMLElement> {
  className?: string;
  type: string;
}

export default function Icon({className, type, ...props}: IconProps) {
  return <i className={clsx('Icon', className, {pointable: props.onClick})} {...props}>
    {type}
  </i>;
}
