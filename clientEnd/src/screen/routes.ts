import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const routes = {
  home: 'Home',
  profile: 'Profile',
  search: 'Search',
  recites: 'Recites',
  reciteCollection: 'ReciteCollection',
  recommendation: 'Recommendation',
  collectionList: 'CollectionList',
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
  CollectionList: undefined;
  RecitePoetDetail: {
    collectionName?: string;
  };
  CollectionPoet: {
    collectionName?: string;
  };
};
