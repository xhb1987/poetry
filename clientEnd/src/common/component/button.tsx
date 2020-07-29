import React, { FC } from 'react';
import { ButtonProps, View, Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '../types/types';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { LoadingIndicator } from 'src/screen/home/component/loading-indicator';
import { MaterialIndicator } from 'react-native-indicators';
import { Indicator } from './indicator';

type ButtonType = 'primary' | 'secondary';

export const MyButton: FC<
  TouchableOpacityProps & { type: ButtonType; title: string; loading?: boolean; theme?: AppTheme }
> = ({ type, title, loading, theme: exTheme, ...rest }) => {
  const theme = exTheme || (useTheme() as AppTheme);
  return (
    <View
      style={{
        backgroundColor: rest.disabled ? theme.colors.disabledColor : theme.colors[type],
        borderRadius: 5,
        padding: 2,
      }}
    >
      <TouchableOpacity activeOpacity={0.8} style={{ justifyContent: 'center', alignItems: 'center' }} {...rest}>
        <Text style={{ color: 'white', padding: 8, fontSize: 16, textAlign: 'center' }}>{title}</Text>
        {loading && <Indicator style={{ flex: 10, maxWidth: 18, position: 'absolute', right: 10 }} />}
      </TouchableOpacity>
    </View>
  );
};
