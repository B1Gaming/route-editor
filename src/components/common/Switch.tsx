import '@components/common/Switch.css';

import type { FC, MouseEventHandler, ReactNode } from 'react';

interface SwitchProps {
  active: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLInputElement>;
}

const Switch: FC<SwitchProps> = ({ active, children, onClick }) => {
  return <div className={'switch-wrapper'}>
    {children}
    <label className={'Switch'}>
      <input checked={active} onClick={onClick} type={'checkbox'}/>
      <span className={'slider'}/>
    </label>
  </div>;
};

export default Switch;
