import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { HomeScreen } from '../home';
import { View, Text, Button } from 'react-native';
import { routes } from '../routes';
import { DrawerItem } from './component/drawer-item';
import { DrawerSeparator } from './component/drawer-separator';
import { DrawerMessages } from './messages';
import { useIntl } from 'react-intl';

export const DrawerComponent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 128,
      }}
    >
      <DrawerItem title="名字" route={routes.profile} navigation={props.navigation} />
      <DrawerSeparator />
      <DrawerItem title="收藏" route={routes.favorites} navigation={props.navigation} />
      <DrawerItem title="背诵" route={routes.reciteCollection} navigation={props.navigation} />
      <DrawerItem title="完成背诵" route={routes.finished} navigation={props.navigation} />
      <DrawerSeparator />

      <DrawerItem title="关于我们" route={routes.aboutUs} navigation={props.navigation} />
      <DrawerItem title="退出" route={routes.search} navigation={props.navigation} />

      {/* <DrawerItemList {...props}>
      <DrawerItem {...props} label="xxxx" labelStyle={{ color: 'black' }} />
    </DrawerItemList> */}
    </DrawerContentScrollView>
  );
};
