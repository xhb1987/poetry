import React, { FC } from 'react';
import { View, ViewProps, Dimensions, SafeAreaView } from 'react-native';

export const PageView: FC<ViewProps> = (prop) => (
  <SafeAreaView style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 8, paddingVertical: 8 }}>
    <View {...prop}>{prop.children}</View>
  </SafeAreaView>
);
