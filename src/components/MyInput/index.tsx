/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';

import { MyInputProps } from 'components/MyInput/types';
import { MyContext } from 'context';
import { ReturnComponentType } from 'types';

export class MyInput extends Component<MyInputProps> {
  render(): ReturnComponentType {
    return (
      <MyContext.Consumer>
        {value => (
          <div>
            <h4>User Input</h4>
            <ul>
              {value.users.map((user: string) => (
                <li key={user}>{user}</li>
              ))}
            </ul>
            <button onClick={() => value.updateUser('Pavel')} type="submit">
              Add User
            </button>
            <input />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
