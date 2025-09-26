import '@components/common/Switch.css';

import type {MouseEventHandler, ReactNode} from 'react';

interface SwitchProps {
  active: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLInputElement>;
}

export default function Switch({active, children, onClick}: SwitchProps) {
  return <div className={'switch-wrapper'}>
    {children}
    <label className={'Switch'}>
      <input checked={active} onClick={onClick} type={'checkbox'}/>
      <span className={'slider'}/>
    </label>
  </div>;
}
