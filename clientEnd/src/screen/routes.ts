import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const routes = {
  home: 'Home',
  profile: 'Profile',
  search: 'Search',
  recites: 'Recites',
  reciteCollection: 'ReciteCollection',

  collectionPoet: 'CollectionPoet',
  recitePoetDetail: 'RecitePoetDetail',
  finished: 'Finished',
  aboutUs: 'AboutUs',
  poetModal: 'PoetModal',
  searchModal: 'SearchModal',
  login: 'Login',
  register: 'Register',
};

export type RootRouteParamProps = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  SearchModal: undefined;
  RecitePoetDetail: {
    collectionName?: string;
  };
  CollectionPoet: {
    collectionName?: string;
  };
};
