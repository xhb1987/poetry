import React, { FC } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import MyText from 'src/common/component/text';
import { selectSelectedPoetry } from 'src/state/poetry/selectors';
import { PoetryAuthor } from '../../component/poetry-author';
import { PoetryParagraph } from '../../component/poetry-paragraph';
import { PoetryTitle } from '../../component/poetry-title';

export const SelectedPoetry: FC = () => {
  const selectedPoetry = useSelector(selectSelectedPoetry);

  return (
    <ScrollView contentContainerStyle={style.contentContainer}>
      {selectedPoetry && (
        <>
          <PoetryTitle title={selectedPoetry.title} />
          <PoetryAuthor author={selectedPoetry.author} />
          <PoetryParagraph paragraph={selectedPoetry.paragraphs} />
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
