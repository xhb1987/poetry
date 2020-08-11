import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { PageView } from 'src/common/component/page-view';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCollectionEdit,
  selectFinishedCollections,
  selectReciteCollectionLoading,
} from 'src/state/recites/selectors';
import { Collection } from 'src/state/recites/types';
import { CollectionItem } from '../../component/collection-item';
import { useNavigation } from '@react-navigation/native';
import { recitesActions } from 'src/state/recites/actions';
import { routes } from 'src/screen/routes';
import { MyButton } from 'src/common/component/button';

export const FinishedPage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const finishedCollections = useSelector(selectFinishedCollections);
  const isLoading = useSelector(selectReciteCollectionLoading);

  const editMode = useSelector(selectCollectionEdit);

  const [selectedCollections, setSelectedCollections] = useState<Collection[]>([]);

  const goToCollection = (collection: Collection) => {
    dispatch(recitesActions.selectReciteCollection(collection));
    navigation.navigate(routes.collectionPoetry, { collectionName: collection.name });
  };

  const onDeleteClick = () => {
    const collectionIds = selectedCollections.map((collection) => collection.id);
    collectionIds.length && dispatch(recitesActions.deleteCollections(collectionIds));
  };

  const onCollectionCheck = (collections: Collection[]) => {
    setSelectedCollections(collections);
  };

  return (
    <PageView style={style.container}>
      <ScrollView>
        {finishedCollections.map((collection: Collection) => (
          <CollectionItem
            collections={selectedCollections}
            key={collection.id}
            collection={collection}
            onPress={() => goToCollection(collection)}
            onCollectionCheck={onCollectionCheck}
          />
        ))}
      </ScrollView>
      {editMode && finishedCollections.length > 0 && (
        <MyButton loading={isLoading} disabled={isLoading} title="删除" type="secondary" onPress={onDeleteClick} />
      )}
    </PageView>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.85,
    paddingBottom: 64,
  },
});
