import React, { useReducer, ChangeEvent } from 'react';

import { userReducer } from './reducer';
import { UserReducer, UserReducerAction } from './types';

const initializeState = (initializeNewUserName: string): UserReducer => {
  console.log('initialize');

  return { users: [], newUserName: initializeNewUserName };
};

export const WithUseReducer: React.FC = () => {
  const [{ users, newUserName }, dispatch] = useReducer<
    React.Reducer<UserReducer, UserReducerAction>,
    string
  >(userReducer, 'Ann', initializeState);

  const handleAddUser = (): void => {
    dispatch({ type: 'ADD_USER' });
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: 'changeNewName', payload: event.currentTarget.value });
  };

  return (
    <div>
      <h1>Super Component</h1>
      <input onChange={handleNameChange} value={newUserName} />
      <button type="submit" onClick={handleAddUser}>
        Add User
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};
