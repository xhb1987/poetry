import React, { FC } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { routes } from '../routes';
import { HomePage } from './pages/home-page';
import { NavigationState } from '@react-navigation/native';
import { NavigationStackProp } from 'react-navigation-stack';
import { ProfileButton } from './component/profile-button';
import { SearchButton } from './component/search-button';
import { SearchPage } from './pages/search-page';
import { ProfilePage } from './pages/profile-page';
import { FavoritesPage } from './pages/favorites-page';
import { RecitesPage } from './pages/recites-page';
import { FinishedPage } from './pages/finished-page';
import { AboutUsPage } from './pages/about-us-page';
const Stack = createStackNavigator();

// const Style = StyleSheet.create({
//   paddingLeft: 10,
// });

export const HomeScreen: FC<{ navigation: NavigationStackProp }> = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: 'white' },
      // headerLeft: () => <ProfileButton />,
      // headerRight: () => <SearchButton />,
      headerTitle: '',
    }}
  >
    <Stack.Screen
      name={routes.home}
      component={HomePage}
      options={{
        headerLeft: () => <ProfileButton />,
        headerRight: () => <SearchButton />,
      }}
    />
    <Stack.Screen name={routes.profile} component={ProfilePage} />
    <Stack.Screen name={routes.search} component={SearchPage} />
    <Stack.Screen name={routes.favorites} component={FavoritesPage} />
    <Stack.Screen name={routes.recites} component={RecitesPage} />
    <Stack.Screen name={routes.finished} component={FinishedPage} />
    <Stack.Screen name={routes.aboutUs} component={AboutUsPage} />
  </Stack.Navigator>
);
