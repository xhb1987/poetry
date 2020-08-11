import React, { FC } from 'react';
import MyText from 'src/common/component/text';
import { StyleSheet } from 'react-native';

export const PoetryParagraph: FC<{ paragraph: string }> = ({ paragraph }) => (
  <MyText style={style.paragraph}>{paragraph}</MyText>
);

const style = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    lineHeight: 32,
    letterSpacing: 0.2,
  },
});
