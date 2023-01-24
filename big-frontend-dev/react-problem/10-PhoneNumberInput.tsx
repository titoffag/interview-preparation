
import React from 'react';

type Props = {
  defaultValue?: string;
}

// JS Helpers
const filterCharsByRegExp = (value: string, regExp: RegExp): string => 
  [...value].filter(char => regExp.test(char)).join('');

const formatter = (value: string, rules: any[]): string => {
  let result = value;

  for (const rule of rules) {
    result = result.replace(rule.when, rule.mask);
  }
  
  return result;
};

export function PhoneNumberInput({defaultValue = ''}: Props) {
  const [value, setValue] = React.useState(defaultValue);

  const typingHandle = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumericalChars = filterCharsByRegExp(evt.target.value, /\d/);
    const formattedValue = formatter(onlyNumericalChars, [
      {
        when: /^(\d{1,3})$/,
        mask: "$1",
      },
      {
        when: /^(\d{3})(\d{1,3})$/,
        mask: "($1)$2",
      },
      {
        when: /^(\d{3})(\d{3})(\d{0,4})\d*$/,
        mask: "($1)$2-$3",
      }
    ]);
    setValue(formattedValue);
  };

  return (
    <input
      data-testid="phone-number-input"
      type="text"
      value={value}
      onChange={typingHandle}
    />
  );
}
