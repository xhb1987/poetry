import React, { FC } from 'react';
import { routes } from '../routes';
import MyText from 'src/common/component/text';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTheme as Theme } from 'src/common/types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesScreen, ProfileScreen, ReciteCollectionScreen, FinishedScreen } from './pages';

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
