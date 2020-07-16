import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MyText from 'src/common/component/text';
import { selectSelectedPoet } from 'src/state/poet/selector';

export const SelectedPoet: FC = () => {
  const selectedPoet = useSelector(selectSelectedPoet);
  const paragraphs = selectedPoet?.paragraphs.split('。').filter((content) => content);

  return (
    <ScrollView contentContainerStyle={style.contentContainer}>
      <MyText style={style.title}>{selectedPoet?.title}</MyText>
      <MyText style={style.author}>{selectedPoet?.author}</MyText>
      {paragraphs?.map((content: string, index: number) => (
        <MyText style={style.content} key={index}>
          {content}。
        </MyText>
      ))}
    </ScrollView>
  );
};

const style = StyleSheet.create({
  contentContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.6,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  author: {
    paddingVertical: 16,
  },
  content: {
    paddingVertical: 5,
    fontSize: 18,
  },
});
