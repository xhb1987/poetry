import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { RefreshControl as BaseRefreshControl } from 'react-native';

export const RefreshControl: FC<{ loading: boolean; onRefresh: () => void }> = ({ loading, onRefresh }) => {
  const theme = useTheme();
  return <BaseRefreshControl tintColor={theme.colors.primary} refreshing={loading} onRefresh={onRefresh} />;
};
