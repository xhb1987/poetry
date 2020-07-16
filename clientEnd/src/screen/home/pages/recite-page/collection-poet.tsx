import React from 'react';
import { View, ScrollView } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { poetActions } from 'src/state/poet/actions';
import { Poet } from 'src/state/poet/types';
import { EmptyPrompt } from '../../component/empty-prompt';
import { PoetItem } from '../../component/poet-item';
import { selectCurrentCollection, selectReciteCollectionPoets } from 'src/state/recites/selectors';
import { PageView } from 'src/common/component/page-view';
import { MyButton } from 'src/common/component/button';

export const CollectionPoetPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentCollection = useSelector(selectCurrentCollection);
  const userReciteCollectionPoet = useSelector(selectReciteCollectionPoets);

  const { poet = [], isFinished } = currentCollection || {};

  const onPoetItemPress = (poet: Poet) => {
    dispatch(poetActions.openPoetDialog('recite'));
    dispatch(poetActions.selectPoet(poet));
  };
  return (
    <PageView>
      {poet.length === 0 ? (
        <EmptyPrompt />
      ) : (
        <>
          <ScrollView>
            {poet.map((poet) => (
              <PoetItem key={poet.id} poet={poet} onPress={() => onPoetItemPress(poet)} />
            ))}
          </ScrollView>
          {!isFinished && <MyButton type="primary" title="完成" onPress={() => console.log('finish')} />}
        </>
      )}
    </PageView>
  );
};
