import React from 'react';
import { ScrollView } from 'react-native';
import { PageView } from 'src/common/component/page-view';
import { useDispatch, useSelector } from 'react-redux';
import { selectFinishedCollections } from 'src/state/recites/selectors';
import { Collection } from 'src/state/recites/types';
import { CollectionItem } from '../../component/collection-item';
import { useNavigation } from '@react-navigation/native';
import { recitesActions } from 'src/state/recites/actions';
import { routes } from 'src/screen/routes';

export const FinishedPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const finishedCollections = useSelector(selectFinishedCollections);

  const goToCollection = (collection: Collection) => {
    dispatch(recitesActions.selectReciteCollection(collection));
    navigation.navigate(routes.collectionPoet, { collectionName: collection.name });
  };
  return (
    <PageView>
      <ScrollView>
        {finishedCollections.map((collection: Collection) => (
          <CollectionItem key={collection.id} collection={collection} onPress={() => goToCollection(collection)} />
        ))}
      </ScrollView>
    </PageView>
  );
};
