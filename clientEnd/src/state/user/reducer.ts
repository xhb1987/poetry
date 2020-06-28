import { User, ProfileReciteCollection } from './types';
import { UserActions, userActions } from './actions';
import { getType, StateType } from 'typesafe-actions';

type UserReducer = User & {
  loading: boolean;
  error: boolean;
  selectedReciteCollection?: ProfileReciteCollection;
};

const initState: UserReducer = {
  username: '',
  roles: [],
  profile: {
    id: 123,
    name: '',
    favorites: [
      {
        id: 1234,
        title: '帝京篇十首 一',
        author: '太宗皇帝',
        paragraphs:
          '秦川雄帝宅，函谷壮皇居。 绮殿千寻起，离宫百雉馀。 连甍遥接汉，飞观迥凌虚。 云日隐层阙，风烟出绮疎。',
      },
    ],
    recites: [
      {
        id: 123,
        name: '五年级',
        poet: [
          {
            id: 1234,
            title: '帝京篇十首 一',
            author: '太宗皇帝',
            paragraphs:
              '秦川雄帝宅，函谷壮皇居。 绮殿千寻起，离宫百雉馀。 连甍遥接汉，飞观迥凌虚。 云日隐层阙，风烟出绮疎。',
          },
          {
            id: 4321,
            title: '帝京篇十首 2',
            author: '太宗皇帝',
            paragraphs:
              '秦川雄帝宅，函谷壮皇居。 绮殿千寻起，离宫百雉馀。 连甍遥接汉，飞观迥凌虚。 云日隐层阙，风烟出绮疎。',
          },
        ],
      },
    ],
    finished: [],
  },
  selectedReciteCollection: undefined,
  loading: false,
  error: false,
};

export const userReducer = (state: UserReducer = initState, action: UserActions) => {
  switch (action.type) {
    case getType(userActions.userRegister): {
      return { ...state, loading: true };
    }
    case getType(userActions.selectUserProfileReciteCollection): {
      return {
        ...state,
        selectedReciteCollection: action.payload.collection,
      };
    }
    default:
      return state;
  }
};

export type UserState = StateType<typeof userReducer>;
