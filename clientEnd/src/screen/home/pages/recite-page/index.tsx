import React, { FC } from 'react';
import { Stack } from '..';
import { routes } from 'src/screen/routes';
import { ReciteCollectionPage } from './recite-collection-page';
import { CollectionPoetPage } from './collection-poet';
import { AddButton } from './component/add-button';

export const ReciteCollectionScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.reciteCollection}
      component={ReciteCollectionPage}
      options={{ headerTitle: '背诵', headerRight: () => <AddButton />, headerStyle: { shadowColor: 'transparent' } }}
    />
  </Stack.Navigator>
);
