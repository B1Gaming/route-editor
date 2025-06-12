import '@components/common/Switch.css';

import {type FC, type MouseEventHandler, type ReactNode} from 'react';

import Button from '@components/common/Button';
import Icon from '@components/common/Icon';

interface SwitchProps {
  active: boolean;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Switch: FC<SwitchProps> = ({active, children, onClick}) => {
  return <div className={'Switch'}>
    <label>{children}</label>
    <Button color={active ? 'success' : 'danger'} onClick={onClick}>
      <Icon type={active ? 'check' : 'close'}/>
    </Button>
  </div>;
};

export default Switch;
