import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { MaterialIndicator } from 'react-native-indicators';

export const Indicator: FC<{ style: StyleProp<ViewStyle>; color?: string }> = ({ style, color = 'white' }) => (
  <MaterialIndicator size={18} color={color} style={style} />
);
