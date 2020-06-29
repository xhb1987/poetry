import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Stack } from '..';
import { routes } from 'src/screen/routes';
import { FavoritesPage } from './favorites-page';
import { SearchButton } from '../../component/search-button';

export const FavoritesScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.favorites}
      component={FavoritesPage}
      options={{
        headerTitle: '',
        headerRight: () => <SearchButton />,
        headerBackTitleVisible: false,
        headerStyle: {
          shadowColor: 'transparent',
        },
      }}
    />
  </Stack.Navigator>
);
