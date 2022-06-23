/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';

import { MyInputProps, MyInputState } from 'components/MyInput/types';
import { MyContext } from 'context';
import { ReturnComponentType } from 'types';

export class MyInput extends Component<MyInputProps, MyInputState> {
  constructor(props: MyInputProps) {
    super(props);

    this.state = {
      newUser: '',
    };
  }

  render(): ReturnComponentType {
    const { newUser } = this.state;
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
            <button
              onClick={() => {
                this.setState({ newUser: '' });
                value.updateUser(newUser);
              }}
              type="submit"
            >
              Add User
            </button>
            <input
              value={newUser}
              onChange={event => this.setState({ newUser: event.target.value })}
            />
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
