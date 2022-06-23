import React, { Component } from 'react';

import { MyInput } from 'components/MyInput';
import { MyContext } from 'context';
import { ReturnComponentType } from 'types';

export class MyForContext extends Component {
  // eslint-disable-next-line react/static-property-placement
  static contextType = MyContext;

  // eslint-disable-next-line react/static-property-placement
  context!: React.ContextType<typeof MyContext>;

  render(): ReturnComponentType {
    const { users, updateUser } = this.context;
    return (
      <div>
        <ul>
          {users.map((user: string) => (
            <li key={user}>{user}</li>
          ))}
        </ul>
        <button onClick={() => updateUser('Bob')} type="submit">
          Add User
        </button>
        <MyInput />
      </div>
    );
  }
}
