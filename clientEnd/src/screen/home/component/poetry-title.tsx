import React, { FC } from 'react';
import MyText from 'src/common/component/text';
import { StyleSheet } from 'react-native';

export const PoetryTitle: FC<{ title: string }> = ({ title }) => <MyText style={style.title}>{title}</MyText>;

const style = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
});
