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
  collectionPoetry: 'CollectionPoetry',
  recitePoetryDetail: 'RecitePoetryDetail',
  finished: 'Finished',
  aboutUs: 'AboutUs',
  poetryModal: 'PoetryModal',
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
  RecitePoetryDetail: {
    collectionName?: string;
  };
  CollectionPoetry: {
    collectionName?: string;
  };
};
