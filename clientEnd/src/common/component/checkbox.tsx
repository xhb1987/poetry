import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '@react-navigation/native';
import React, { FC, useState } from 'react';

export const MyCheckbox: FC<{ onChange: (value: boolean) => void }> = ({ onChange }) => {
  const theme = useTheme();
  const [checkboxValue, setCheckboxValue] = useState(false);

  const onCheckboxValueChange = (v: boolean) => {
    setCheckboxValue(v);

    return onChange(v);
  };

  return (
    <CheckBox
      tintColor={theme.colors.primary}
      onCheckColor={theme.colors.primary}
      onTintColor={theme.colors.primary}
      animationDuration={0.1}
      boxType={'square'}
      style={{ width: 16, height: 16, marginLeft: 1 }}
      onValueChange={onCheckboxValueChange}
      value={checkboxValue}
    />
  );
};
