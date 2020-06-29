import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { HomeTab } from './home';
import { routes } from './routes';
import { AppTheme as Theme } from 'src/common/types/types';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchModal } from './home/modal/search-modal';
import { SearchInput } from './home/component/search-input';
import { CollectionPoetPage } from './home/pages/recite-page/collection-poet';

const Stack = createStackNavigator();

export const Screen: FC<{ theme: Theme }> = ({ theme }) => (
  <NavigationContainer theme={theme}>
    <Stack.Navigator screenOptions={{ headerShown: true, headerTitle: '', headerTransparent: true }}>
      <Stack.Screen options={{ headerShown: false }} name={routes.home}>
        {() => <HomeTab theme={theme} />}
      </Stack.Screen>
      <Stack.Screen
        name={routes.collectionPoet}
        component={CollectionPoetPage}
        options={{ headerTitle: '', headerBackTitle: '返回' }}
      />
      <Stack.Screen
        name={routes.searchModal}
        component={SearchModal}
        options={{ headerTitle: () => <SearchInput autoFocus searchButton />, headerLeft: () => undefined }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
