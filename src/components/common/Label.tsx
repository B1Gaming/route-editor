import '@components/common/Label.css';

import type {ReactNode} from 'react';

interface LabelProps {
  children: ReactNode;
}

export default function Label({children}: LabelProps) {
  return <div className={'Label'}>{children}</div>;
}
