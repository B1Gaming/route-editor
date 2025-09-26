import '@components/common/Button.css';

import clsx from 'clsx';
import {type HTMLProps, type ReactNode} from 'react';

import type {ColorType} from '@model/common';

import Icon from '@components/common/Icon';

type ButtonProps =
    (ButtonWithIconProps | ButtonWithoutIconProps)
    & GenericButtonProps
    & HTMLProps<HTMLButtonElement>;

interface ButtonWithIconProps {
  icon: string;
  reversed?: boolean;
}

interface ButtonWithoutIconProps {
  icon?: undefined;
  reversed?: undefined;
}

interface GenericButtonProps {
  children: ReactNode;
  className?: string;
  color?: ColorType;
  outlined?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

export default function Button({
  children,
  className,
  color = 'primary',
  icon,
  outlined,
  reversed,
  type = 'button',
  ...props
}: ButtonProps) {
  const iconElement = icon && <Icon type={icon}/>;

  return <button
      className={clsx('Button', {reversed}, color, className, {outlined})}
      type={type} {...props}>
    {iconElement}
    {children}
  </button>;
}