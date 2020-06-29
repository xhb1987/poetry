import React from 'react';
import { View, ScrollView } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { poetActions } from 'src/state/poet/actions';
import { Poet } from 'src/state/poet/types';
import { EmptyPrompt } from '../../component/empty-prompt';
import { PoetItem } from '../../component/poet-item';
import { selectReciteCollectionPoets } from 'src/state/recites/selectors';
import { PageView } from 'src/common/component/page-view';

export const CollectionPoetPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userReciteCollectionPoet = useSelector(selectReciteCollectionPoets);

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog());
    dispatch(poetActions.selectPoet(poet));
    dispatch(poetActions.setWherePoetFrom('recite'));
  };
  return (
    <PageView>
      <ScrollView>
        {userReciteCollectionPoet.length === 0 ? (
          <EmptyPrompt />
        ) : (
          userReciteCollectionPoet.map((poet) => (
            <PoetItem key={poet.id} poet={poet} onPress={() => onPoetItemPress(poet)} />
          ))
        )}
      </ScrollView>
    </PageView>
  );
};
