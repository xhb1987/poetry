import React, { FC } from 'react';
import { routes } from '../routes';
import MyText from 'src/common/component/text';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTheme as Theme } from 'src/common/types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesScreen, ProfileScreen, ReciteCollectionScreen, FinishedScreen } from './pages';
import { useDispatch } from 'react-redux';
import { recitesActions } from 'src/state/recites/actions';

const Tab = createBottomTabNavigator();

export const HomeTab: FC<{ theme: Theme }> = ({ theme }) => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator initialRouteName={routes.favorites}>
      <Tab.Screen
        name="首页"
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
        listeners={() => ({ tabPress: () => dispatch(recitesActions.editCollectionEnd()) })}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Icon name="tasks" size={26} color={theme.colors.tabColor} style={{ opacity: focused ? 1 : 0.5 }} />;
          },
        }}
      />
      <Tab.Screen
        name="已完成"
        component={FinishedScreen}
        listeners={() => ({ tabPress: () => dispatch(recitesActions.editCollectionEnd()) })}
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
            return (
              <Icon
                name="user-circle-o"
                size={26}
                color={theme.colors.tabColor}
                style={{ opacity: focused ? 1 : 0.5 }}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};
