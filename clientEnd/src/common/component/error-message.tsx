import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { AppTheme } from '../types/types';
import MyText from './text';

export const ErrorMessage: FC<{ message?: string }> = ({ message = '出错啦，请再试一下' }) => {
  const theme = useTheme() as AppTheme;

  return (
    <MyText style={{ color: theme.colors.secondary, marginVertical: 6, fontSize: 14, textAlign: 'center' }}>
      {message}
    </MyText>
  );
};
