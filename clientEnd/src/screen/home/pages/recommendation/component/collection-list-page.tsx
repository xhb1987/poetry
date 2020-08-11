import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Indicator } from 'src/common/component/indicator';
import { PageView } from 'src/common/component/page-view';
import { CollectionItem } from 'src/screen/home/component/collection-item';
import { selectSelectedPoetry } from 'src/state/poetry/selectors';
import { recitesActions } from 'src/state/recites/actions';
import { selectReciteCollectionLoading, selectUnfinishedCollections } from 'src/state/recites/selectors';
import { Collection } from 'src/state/recites/types';
import Icon from 'react-native-vector-icons/Feather';

Icon.loadFont();

export const CollectionListPage: FC = () => {
  const unfinishedCollections = useSelector(selectUnfinishedCollections);
  const selectedPoetry = useSelector(selectSelectedPoetry);
  const theme = useTheme();
  const dispatch = useDispatch();

  const addPoetryToCollection = (collection: Collection) => {
    selectedPoetry && dispatch(recitesActions.addPoetryToCollection(collection.id, selectedPoetry.id));
  };

  const loading = useSelector(selectReciteCollectionLoading);

  return (
    <PageView style={{ padding: 8 }}>
      <ScrollView>
        {unfinishedCollections.map((collection: Collection) => {
          const alreadyHas = collection.poetries.some((poetry) => poetry.id === selectedPoetry?.id);
          return (
            <View key={collection.id}>
              <CollectionItem
                disabled={loading || alreadyHas}
                collection={collection}
                onPress={() => addPoetryToCollection(collection)}
              />
              {loading && (
                <Indicator
                  color={theme.colors.primary}
                  style={{ maxWidth: 24, position: 'absolute', right: 10, top: 14 }}
                />
              )}

              {!loading && alreadyHas && (
                <Icon
                  name="check"
                  color={theme.colors.primary}
                  size={24}
                  style={{ maxWidth: 24, position: 'absolute', right: 10, top: 10 }}
                />
              )}
            </View>
          );
        })}
      </ScrollView>
    </PageView>
  );
};
