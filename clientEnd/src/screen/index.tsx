import React, { FC } from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { FavoritesScreen, ReciteCollectionScreen, FinishedScreen, ProfileScreen, HomeTab } from './home';
import { routes } from './routes';
import { DrawerComponent } from './drawer';
import { AppTheme as Theme } from 'src/common/types/types';
import { View, Text } from 'react-native';
import { FavoritesPage } from './home/pages/favorites-page';
import { ReciteCollectionPage } from './home/pages/recite-page/recite-collection-page';
import { FinishedPage } from './home/pages/finished-page';
import { ProfilePage } from './home/pages/profile-page';
import Icon from 'react-native-vector-icons/FontAwesome';
import MyText from 'src/common/component/text';
import { createStackNavigator } from '@react-navigation/stack';
import { SearchModal } from './home/modal/search-modal';
import { SearchInput } from './home/component/search-input';

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const Screen: FC<{ theme: Theme }> = ({ theme }) => (
  <NavigationContainer theme={theme}>
    <Stack.Navigator screenOptions={{ headerShown: true, headerTitle: '', headerLeft: undefined }} mode="modal">
      <Stack.Screen options={{ headerShown: false }} name={routes.home}>
        {() => <HomeTab theme={theme} />}
      </Stack.Screen>
      {/* <Stack.Screen name={routes.home} component={() => <HomeTab theme={theme} />} /> */}
      {/* <Stack.Screen name={routes.searchModal} component={SearchModal} /> */}
      <Stack.Screen
        name={routes.searchModal}
        component={SearchModal}
        options={{ headerTitle: () => <SearchInput autoFocus /> }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
