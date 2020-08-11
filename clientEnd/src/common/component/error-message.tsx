import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { AppTheme } from '../types/types';
import MyText from './text';

export const ErrorMessage: FC<{ color?: string; message?: string; style?: StyleProp<ViewStyle> }> = ({
  color,
  message = '出错啦，请再试一下',
  style: exStyle,
}) => {
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);

  const messageStyle = {
    ...style.message,
    ...(exStyle ? (exStyle as Object) : {}),
    color,
  };

  return <MyText style={messageStyle}>{message}</MyText>;
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    message: { color: theme.colors.secondary, marginVertical: 6, fontSize: 14, textAlign: 'center' },
  });
