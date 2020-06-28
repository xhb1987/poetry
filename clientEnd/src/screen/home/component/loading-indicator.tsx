import React, { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';
import MyText from 'src/common/component/text';
import { useTheme } from '@react-navigation/native';

export const LoadingIndicator: FC<{ title?: string; color?: string; size?: 'small' | 'large' }> = ({
  title,
  color,
  size,
}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        marginTop: -12,
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        shadowColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
      }}
    >
      <ActivityIndicator size={size} color={color || theme.colors.primary} />
      <MyText style={{ marginTop: 12 }}>{title}</MyText>
    </View>
  );
};
