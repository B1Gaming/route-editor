import '@components/common/Frame.css';

import clsx from 'clsx';
import { type FC, type HTMLProps } from 'react';

interface BorderedFrameProps {
  type: 'bordered';
}

interface EmptyFrameProps {
  type?: 'empty';
}

type FrameProps = { className?: string }
  & (BorderedFrameProps | EmptyFrameProps | TitledFrameProps)
  & HTMLProps<HTMLDivElement>;

interface TitledFrameProps {
  title?: string;
  type: 'titled';
}

const Frame: FC<FrameProps> = ({ children, className, title, type = 'empty', ...props }) => {
  return <div className={clsx('Frame', title ? 'titled' : type, className)} {...props}>
    {title && <span className={'title'}>{title}</span>}
    {children}
  </div>;
};

export default Frame;
