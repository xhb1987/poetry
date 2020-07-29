import React, { FC } from 'react';
import { routes } from '../routes';
import MyText from 'src/common/component/text';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppTheme as Theme } from 'src/common/types/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProfileScreen, ReciteCollectionScreen, FinishedScreen } from './pages';
import { useDispatch } from 'react-redux';
import { recitesActions } from 'src/state/recites/actions';
import { RecommendationScreen } from './pages/recommendation';

const Tab = createBottomTabNavigator();

export const HomeTab: FC<{ theme: Theme }> = ({ theme }) => {
  const dispatch = useDispatch();
  return (
    <Tab.Navigator initialRouteName={routes.home}>
      <Tab.Screen
        name={routes.recommendation}
        component={RecommendationScreen}
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
        name={routes.recites}
        component={ReciteCollectionScreen}
        listeners={() => ({ tabPress: () => dispatch(recitesActions.editCollectionEnd()) })}
        options={{
          tabBarLabel: ({ focused }) => (
            <MyText style={{ color: theme.colors.tabColor, opacity: focused ? 1 : 0.5, fontSize: 12 }}>背诵</MyText>
          ),
          tabBarIcon: ({ focused }) => {
            return <Icon name="tasks" size={26} color={theme.colors.tabColor} style={{ opacity: focused ? 1 : 0.5 }} />;
          },
        }}
      />
      <Tab.Screen
        name={routes.finished}
        component={FinishedScreen}
        listeners={() => ({ tabPress: () => dispatch(recitesActions.editCollectionEnd()) })}
        options={{
          tabBarLabel: ({ focused }) => (
            <MyText style={{ color: theme.colors.tabColor, opacity: focused ? 1 : 0.5, fontSize: 12 }}>已完成</MyText>
          ),
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
        name={routes.profile}
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <MyText style={{ color: theme.colors.tabColor, opacity: focused ? 1 : 0.5, fontSize: 12 }}>我的</MyText>
          ),
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
