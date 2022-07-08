import { Reducer } from 'react';

import { UserReducer, UserReducerAction } from './types';

import { ONE } from 'constants/index';

export const userReducer: Reducer<UserReducer, UserReducerAction> = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        users: [
          ...state.users,
          {
            id: state.users.length + ONE,
            name: state.newUserName,
          },
        ],
        newUserName: '',
      };
    case 'changeNewName':
      return {
        ...state,
        newUserName: action.payload,
      };
    default:
      throw new Error('Action Type does not exist');
  }
};
