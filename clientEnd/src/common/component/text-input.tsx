import React, { FC } from 'react';
import { TextInput as BaseTextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../types/types';

export const TextInput: FC<TextInputProps & { theme?: AppTheme }> = ({ theme: exTheme, ...rest }) => {
  const theme = exTheme || (useTheme() as AppTheme);
  const style = getStyle(theme);

  return <BaseTextInput style={style.input} {...rest} />;
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    input: {
      flex: 5,
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      marginRight: 5,
      paddingHorizontal: 10,
      paddingVertical: 2,
      minHeight: 32,
    },
  });
