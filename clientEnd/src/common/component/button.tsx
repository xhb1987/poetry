import React, { FC } from 'react';
import { ButtonProps, View, Button } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../types/types';

type ButtonType = 'primary' | 'secondary';

export const MyButton: FC<ButtonProps & { type: ButtonType }> = ({ type, ...rest }) => {
  const theme = useTheme() as AppTheme;

  return (
    <View style={{ backgroundColor: theme.colors[type] }}>
      <Button {...rest} color={'white'} />
    </View>
  );
};
