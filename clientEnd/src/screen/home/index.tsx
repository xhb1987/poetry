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
import { PoetModal } from './modal/poet-modal';
import MyText from 'src/common/component/text';
import { SearchInput } from './component/search-input';
import { ReciteCollectionPage } from './pages/recite-page/recite-collection-page';
import { CollectionPoetPage } from './pages/recite-page/collection-poet';
import { SearchModal } from './modal/search-modal';
import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppTheme as Theme } from 'src/common/types/types';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeTab: FC<{ theme: Theme }> = ({ theme }) => (
  <Tab.Navigator initialRouteName={routes.favorites}>
    <Tab.Screen
      name="favorites"
      component={FavoritesScreen}
      options={{
        tabBarLabel: ({ focused }) => (
          <MyText style={{ color: theme.colors.tabColor, opacity: focused ? 1 : 0.5, fontSize: 12 }}>首页</MyText>
        ),
        tabBarIcon: ({ focused }) => {
          return <Icon name="home" size={26} color={theme.colors.tabColor} style={{ opacity: focused ? 1 : 0.5 }} />;
        },
      }}
    />
    <Tab.Screen
      name="背诵"
      component={ReciteCollectionScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          return <Icon name="tasks" size={26} color={theme.colors.tabColor} style={{ opacity: focused ? 1 : 0.5 }} />;
        },
      }}
    />
    <Tab.Screen
      name="已完成"
      component={FinishedScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <Icon
              name="check-square-o"
              size={26}
              color={theme.colors.tabColor}
              style={{ opacity: focused ? 1 : 0.5 }}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="我的"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ focused }) => {
          return <Icon name="bars" size={26} color={theme.colors.tabColor} style={{ opacity: focused ? 1 : 0.5 }} />;
        },
      }}
    />
  </Tab.Navigator>
);

export const FavoritesScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={routes.favorites}
      component={FavoritesPage}
      options={{
        headerTitle: () => <SearchInput autoFocus={false} />,
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

export const ReciteCollectionScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.reciteCollection} component={ReciteCollectionPage} options={{ headerTitle: '背诵' }} />
    <Stack.Screen name={routes.collectionPoet} component={CollectionPoetPage} options={{ headerTitle: '' }} />
  </Stack.Navigator>
);

export const FinishedScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.finished} component={FinishedPage} options={{ headerTitle: '已完成' }} />
  </Stack.Navigator>
);

export const ProfileScreen: FC = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.profile} component={ProfilePage} />
  </Stack.Navigator>
);
