import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { HomeScreen } from './home';
import { routes } from './routes';
import { DrawerComponent } from './drawer';
import { AppTheme as Theme } from 'src/common/types/types';
import { View, Text } from 'react-native';

const AppTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#84DCC6',
    secondary: '#FFA69E',
    text: '#84DCC6',
    fontColor: '#373737',
  },
};

const Drawer = createDrawerNavigator();
export const Screen = () => (
  <NavigationContainer theme={AppTheme}>
    <Drawer.Navigator
      initialRouteName={routes.home}
      drawerContent={(props: DrawerContentComponentProps) => <DrawerComponent {...props} />}
    >
      <Drawer.Screen name={routes.home} component={HomeScreen} />
    </Drawer.Navigator>
  </NavigationContainer>
);
