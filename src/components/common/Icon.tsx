import '@components/common/Icon.css';

import clsx from 'clsx';
import { type FC, type HTMLProps } from 'react';

interface IconProps extends HTMLProps<HTMLElement> {
  className?: string;
  type: string;
}

const Icon: FC<IconProps> = ({ className, type, ...props }) => {
  return <i className={clsx('Icon', className, { pointable: props.onClick })} {...props}>
    {type}
  </i>;
};

export default Icon;
