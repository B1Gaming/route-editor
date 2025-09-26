import '@components/common/MultiTextInput.css';

import {type HTMLProps, useEffect, useState} from 'react';

import Button from '@components/common/Button';
import Icon from '@components/common/Icon';

interface MultiTextInputProps extends HTMLProps<HTMLInputElement> {
  setParentValue: (values: string[]) => void;
  values: string[];
  verifyMethod?: (value: string) => boolean;
}

export default function MultiTextInput({setParentValue, values, verifyMethod, ...props}: MultiTextInputProps) {
  const [value, setValue] = useState('');
  const valuesCopy = [...values];

  function handleUpdateValue() {
    if ((verifyMethod == undefined || verifyMethod(value)) && !valuesCopy.includes(value)) {
      valuesCopy.push(value);
      setParentValue(valuesCopy.sort());
      setValue('');
    }
  }

  useEffect(() => {
    setValue('');
  }, [values]);

  return <div className={'MultiTextInput'}>
    <div className={'item-list'}>
      {values.map((value, index) => (
          <Button
              className={'item'}
              color={'secondary'}
              key={`${value}_${index}`}
              onClick={() => {
                valuesCopy.splice(index, 1);
                setParentValue(valuesCopy);
              }}
          >
            {value}
          </Button>
      ))}
    </div>
    <div className={'add-item-row'}>
      <input
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUpdateValue();
            }
          }}
          type="text"
          value={value}
          {...props}
      />
      <Button className={'add-item-button'} disabled={value.trim() === ''}
              onClick={handleUpdateValue}>
        <Icon type={'add'}/>
      </Button>
    </div>
  </div>;
}
