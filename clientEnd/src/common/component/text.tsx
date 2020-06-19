import React, { FC } from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

const TextStyle = StyleSheet.create({
  Text: {
    color: '#373737',
  },
});

const MyText: FC<TextProps> = (props) => (
  <Text style={TextStyle.Text} {...props}>
    {props.children}
  </Text>
);

export default MyText;
