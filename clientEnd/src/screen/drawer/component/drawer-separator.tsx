import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from 'src/common/types/types';

export const DrawerSeparator = () => {
  const theme = useTheme() as AppTheme;

  return <View style={{ width: '100%', height: 2, backgroundColor: theme.colors.primary, marginVertical: 24 }} />;
};
