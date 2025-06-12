import '@components/common/Select.css';

import clsx from 'clsx';
import { type FC, useState } from 'react';

import type { SelectOption } from '@model/common';

import Button from '@components/common/Button';
import Icon from '@components/common/Icon';

interface MultiSelectProps {
  multi: true;
  onChange: (value: SelectOption[]) => void;
  value: SelectOption[];
}

type SelectProps = {
  options: SelectOption[];
} & (MultiSelectProps | SingleSelectProps);

interface SingleSelectProps {
  multi?: false;
  onChange: (value: SelectOption) => void;
  value: SelectOption;
}

const Select: FC<SelectProps> = ({ multi, onChange, options, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isOptionSelected = (option: SelectOption) =>
    multi ? value.map((v) => v.value).includes(option.value) : option.value === value.value;

  const selectOption = (option: SelectOption) => {
    if (multi) {
      if (value.map((v) => v.value).includes(option.value)) {
        onChange(value.filter((o) => o.value !== option.value));
      } else {
        onChange([...value, option].sort());
      }
    } else {
      if (option.value !== value.value) {
        onChange(option);
      }
    }
  };

  let itemList;

  if (multi) {
    itemList = value.map((v) => <Button
        className={'item'}
        color={'secondary'}
        key={v.value}
        onClick={(e) => {
          e.stopPropagation();
          selectOption(v);
        }}
        title={v.label}
      >
        {v.value}
      </Button>
    );
  } else {
    itemList = value.label;
  }

  return <div
    className={clsx('Select', { multi })}
    onBlur={() => setIsOpen(false)}
    onClick={() => setIsOpen((prev) => !prev)}
    tabIndex={0}
  >
    <span className={'item-list'}>{itemList}</span>
    <Icon type={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}/>
    <ul className={clsx('options', { shown: isOpen })}>
      {options.map((option) => (
        <li
          className={clsx('option', {
            selected: isOptionSelected(option)
          })}
          key={option.value}
          onClick={(e) => {
            e.stopPropagation();
            selectOption(option);
            setIsOpen(false);
          }}
        >
          {option.label}
        </li>
      ))}
    </ul>
  </div>;
};

export default Select;
