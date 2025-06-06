import '@components/common/Label.css';

import type { FC, ReactNode } from 'react';

interface LabelProps {
  children: ReactNode;
}

const Label: FC<LabelProps> = ({ children }) => {
  return <div className={'Label'}>{children}</div>;
};

export default Label;
