import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { selectPoetrySearchLoading, selectPoetrySearch } from 'src/state/poetry/selectors';
import { Poetry } from 'src/state/poetry/types';
import { poetryActions } from 'src/state/poetry/actions';
import { LoadingIndicator } from '../component/loading-indicator';
import { PoetryItem } from '../component/poetry-item';
import { PageView } from 'src/common/component/page-view';
import MyText from 'src/common/component/text';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SearchModal = () => {
  const dispatch = useDispatch();
  const searchLoading = useSelector(selectPoetrySearchLoading);
  const searchPoetry = useSelector(selectPoetrySearch);
  const theme = useTheme();

  const onPoetItemPress = (poetry: Poetry) => {
    dispatch(poetryActions.openPoetryDialog('add'));
    dispatch(poetryActions.selectPoetry(poetry));
  };
  return (
    <PageView style={style.container}>
      {searchLoading && (
        <View style={style.centerContainer}>
          <LoadingIndicator size="large" color={theme.colors.primary} title="搜索中..." />
        </View>
      )}
      {searchPoetry.length !== 0 &&
        searchPoetry.map((poetry) => (
          <PoetryItem poetry={poetry} onPress={() => onPoetItemPress(poetry)} key={poetry.id} />
        ))}
      {searchPoetry.length === 0 && (
        <View style={style.centerContainer}>
          <Icon name="question-circle" color={theme.colors.primary} size={38} style={{ marginBottom: 12 }} />
          <MyText>没有找到有关的古诗</MyText>
        </View>
      )}
    </PageView>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
  },
  centerContainer: {
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
