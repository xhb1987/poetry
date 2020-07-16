import React, { FC } from 'react';
import { TextInput as BaseTextInput, TextInputProps, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../types/types';

export const TextInput: FC<TextInputProps & { theme?: AppTheme }> = ({ theme: exTheme, style: exStyle, ...rest }) => {
  const theme = exTheme || (useTheme() as AppTheme);
  const style = getStyle(theme);

  const inputStyle = {
    ...style.input,
    ...(exStyle ? (exStyle as Object) : {}),
  };

  return <BaseTextInput style={inputStyle} autoCapitalize="none" {...rest} />;
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    input: {
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 4,
      marginRight: 5,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
  });
