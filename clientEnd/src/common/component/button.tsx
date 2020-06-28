import React, { FC } from 'react';
import { ButtonProps, View, Text, TouchableOpacity, TouchableOpacityProperties } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../types/types';
import { TouchableHighlight } from 'react-native-gesture-handler';

type ButtonType = 'primary' | 'secondary';

export const MyButton: FC<TouchableOpacityProperties & { type: ButtonType; title: string; theme?: AppTheme }> = ({
  type,
  title,
  theme: exTheme,
  ...rest
}) => {
  const theme = exTheme || (useTheme() as AppTheme);
  return (
    <View style={{ backgroundColor: rest.disabled ? theme.colors.disabledColor : theme.colors[type], borderRadius: 5 }}>
      <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center' }} {...rest}>
        <Text style={{ color: 'white', padding: 8, fontSize: 16 }}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
