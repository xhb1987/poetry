import { useNavigation, useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from 'src/common/component/text';
import { AppTheme } from 'src/common/types/types';
import { PoetryAuthor } from 'src/screen/home/component/poetry-author';
import { PoetryParagraph } from 'src/screen/home/component/poetry-paragraph';
import { PoetryTitle } from 'src/screen/home/component/poetry-title';
import { RecommendationPoetries } from 'src/state/recommendation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { routes } from 'src/screen/routes';
import { poetryActions } from 'src/state/poetry/actions';
import { useDispatch } from 'react-redux';

export const RecommendationSection: FC<{ recommendationPoetry: RecommendationPoetries }> = ({
  recommendationPoetry,
}) => {
  const { name, poetry } = recommendationPoetry;
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onClickOnAdd = () => {
    dispatch(poetryActions.selectPoetry(poetry));
    navigation.navigate(routes.collectionList);
  };
  return (
    <View>
      <MyText style={style.recommendationName}>{name}</MyText>
      {poetry && (
        <View style={style.poetrySection}>
          <Icon name="plus" style={style.addButton} size={28} color={theme.colors.primary} onPress={onClickOnAdd} />
          <PoetryTitle title={poetry.title} />
          <PoetryAuthor author={poetry.author} />
          <PoetryParagraph paragraph={poetry.paragraphs} />
        </View>
      )}
    </View>
  );
};

const getStyle = (theme: AppTheme) =>
  StyleSheet.create({
    recommendationName: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
    },

    poetrySection: {
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: theme.colors.primary,
      borderRadius: 5,
      borderWidth: 1,
      paddingVertical: 48,
      width: 'auto',
      position: 'relative',
    },

    addButton: {
      position: 'absolute',
      top: 5,
      right: 5,
    },
  });
