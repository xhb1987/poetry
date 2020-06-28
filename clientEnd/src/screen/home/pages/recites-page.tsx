import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MyText from 'src/common/component/text';
import { useSelector } from 'react-redux';
import { selectReciteCollections } from 'src/state/user/selector';
import { ProfileReciteCollection } from 'src/state/user/types';
import { ScrollView } from 'react-native-gesture-handler';
import { MyButton } from 'src/common/component/button';
import { CollectionItem } from '../component/collection-item';

export const RecitesPage = () => {
  const reciteCollections = useSelector(selectReciteCollections);

  return (
    <View style={style.container}>
      <ScrollView>
        {reciteCollections.map((collection: ProfileReciteCollection) => (
          <CollectionItem collection={collection} />
        ))}
      </ScrollView>
      <View>
        <MyButton
          style={{ alignItems: 'center', padding: 4 }}
          title="新建背诵单"
          onPress={() => console.log}
          type="primary"
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width,
    padding: 16,
  },
});