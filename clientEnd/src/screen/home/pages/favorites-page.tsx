import React from 'react';
import { View } from 'react-native';
import MyText from 'src/common/component/text';
import { PoetItem } from '../component/poet-item';

export const FavoritesPage = () => {
  return (
    <View>
      <PoetItem id={123} title={'静夜思'} author="李白" />
    </View>
  );
};
