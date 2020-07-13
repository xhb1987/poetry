import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { HomeTab } from './home';
import { routes } from './routes';
import { AppTheme as Theme } from 'src/common/types/types';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchModal } from './home/modal/search-modal';
import { SearchInput } from './home/component/search-input';
import { CollectionPoetPage } from './home/pages/recite-page/collection-poet';
import { navigationRef } from 'src/common/navigation/root-navigation';
import { RegisterButton } from './home/pages/profile-page/component/register-button';
import { LoginPage } from './home/pages/auth/login-page';
import { RegisterPage } from './home/pages/auth/register-page';
import { Authentication } from 'src/common/component/authentication';

const Stack = createStackNavigator();

export const Screen: FC<{ theme: Theme }> = ({ theme }) => (
  <NavigationContainer theme={theme} ref={navigationRef}>
    <Stack.Navigator screenOptions={{ headerShown: true, headerTitle: '', headerTransparent: true }}>
      <Stack.Screen options={{ headerShown: false }} name={routes.home}>
        {() => <HomeTab theme={theme} />}
      </Stack.Screen>
      <Stack.Screen
        name={routes.collectionPoet}
        component={CollectionPoetPage}
        options={{ headerTransparent: false, headerTitle: '', headerBackTitle: '返回' }}
      />
      <Stack.Screen
        name={routes.searchModal}
        component={SearchModal}
        options={{
          headerTransparent: false,
          headerTitle: () => <SearchInput autoFocus searchButton />,
          headerLeft: () => undefined,
        }}
      />
      <Stack.Screen
        name={routes.login}
        component={LoginPage}
        options={{
          headerTransparent: false,
          headerTitle: '',
          headerLeft: () => undefined,
          headerRight: () => <RegisterButton />,
          headerStyle: { shadowColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name={routes.register}
        component={RegisterPage}
        options={{
          headerTransparent: false,
          headerTitle: '',
          headerLeft: () => undefined,
          headerStyle: { shadowColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
