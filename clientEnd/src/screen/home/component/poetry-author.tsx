import React, { FC } from 'react';
import MyText from 'src/common/component/text';
import { StyleSheet } from 'react-native';

export const PoetryAuthor: FC<{ author: string }> = ({ author }) => <MyText style={style.author}>{author}</MyText>;

const style = StyleSheet.create({
  author: {
    fontSize: 14,
    marginBottom: 8,
  },
});
