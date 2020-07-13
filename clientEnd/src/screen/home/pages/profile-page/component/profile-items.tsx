import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from 'src/common/types/types';

export const ProfileItem: FC = ({ children }) => {
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);
  return <View style={style.item}>{children}</View>;
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    item: {
      alignContent: 'center',
      justifyContent: 'flex-start',
      borderColor: theme.colors.primary,
      borderWidth: 1,
      borderStyle: 'solid',
      padding: 5,
    },
  });
