import { useNavigation, useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from 'src/common/component/text';
import { AppTheme } from 'src/common/types/types';
import { PoetAuthor } from 'src/screen/home/component/poet-author';
import { PoetParagraph } from 'src/screen/home/component/poet-paragraph';
import { PoetTitle } from 'src/screen/home/component/poet-title';
import { RecommendationPoet } from 'src/state/recommendation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { routes } from 'src/screen/routes';
import { poetActions } from 'src/state/poet/actions';
import { useDispatch } from 'react-redux';

export const RecommendationSection: FC<{ recommendationPoet: RecommendationPoet }> = ({ recommendationPoet }) => {
  const { name, poet } = recommendationPoet;
  const theme = useTheme() as AppTheme;
  const style = getStyle(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onClickOnAdd = () => {
    dispatch(poetActions.selectPoet(poet));
    navigation.navigate(routes.collectionList);
  };
  return (
    <View>
      <MyText style={style.recommendationName}>{name}</MyText>
      {poet && (
        <View style={style.poetSection}>
          <Icon name="plus" style={style.addButton} size={28} color={theme.colors.primary} onPress={onClickOnAdd} />
          <PoetTitle title={poet.title} />
          <PoetAuthor author={poet.author} />
          <PoetParagraph paragraph={poet.paragraphs} />
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

    poetSection: {
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
