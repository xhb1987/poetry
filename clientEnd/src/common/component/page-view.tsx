import React, { FC } from 'react';
import { View, ViewProps, Dimensions, SafeAreaView } from 'react-native';

export const PageView: FC<ViewProps> = (prop) => (
  <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
    <View {...prop}>{prop.children}</View>
  </SafeAreaView>
);
