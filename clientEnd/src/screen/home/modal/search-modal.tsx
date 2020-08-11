import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { selectPoetSearchLoading, selectPoetSearch } from 'src/state/poet/selectors';
import { Poet } from 'src/state/poet/types';
import { poetActions } from 'src/state/poet/actions';
import { LoadingIndicator } from '../component/loading-indicator';
import { PoetItem } from '../component/poet-item';
import { PageView } from 'src/common/component/page-view';
import MyText from 'src/common/component/text';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SearchModal = () => {
  const dispatch = useDispatch();
  const searchLoading = useSelector(selectPoetSearchLoading);
  const searchPoet = useSelector(selectPoetSearch);
  const theme = useTheme();

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog('add'));
    dispatch(poetActions.selectPoet(poet));
  };
  return (
    <PageView style={style.container}>
      {searchLoading && (
        <View style={style.centerContainer}>
          <LoadingIndicator size="large" color={theme.colors.primary} title="搜索中..." />
        </View>
      )}
      {searchPoet.length !== 0 &&
        searchPoet.map((poet) => <PoetItem poet={poet} onPress={() => onPoetItemPress(poet)} key={poet.id} />)}
      {searchPoet.length === 0 && (
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
