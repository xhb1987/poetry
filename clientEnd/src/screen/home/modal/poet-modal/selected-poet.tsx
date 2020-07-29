import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MyText from 'src/common/component/text';
import { selectSelectedPoet } from 'src/state/poet/selectors';
import { PoetAuthor } from '../../component/poet-author';
import { PoetParagraph } from '../../component/poet-paragraph';
import { PoetTitle } from '../../component/poet-title';

export const SelectedPoet: FC = () => {
  const selectedPoet = useSelector(selectSelectedPoet);

  return (
    <ScrollView contentContainerStyle={style.contentContainer}>
      {selectedPoet && (
        <>
          <PoetTitle title={selectedPoet.title} />
          <PoetAuthor author={selectedPoet.author} />
          <PoetParagraph paragraph={selectedPoet.paragraphs} />
        </>
      )}
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
