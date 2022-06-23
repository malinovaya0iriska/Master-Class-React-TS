import React, { createContext } from 'react';

import { ReturnComponentType } from 'types';

// export type MyContextType = 'light' | 'dark';
export type MyContextType = {
  users: string[];
  updateUser: (user: string) => any;
};

export const MyContext = createContext<MyContextType>({
  users: [],
  updateUser: () => {},
});

export type MyContextProviderState = {
  users: string[];
};

export class MyContextProvider extends React.Component<
  { children: React.ReactNode },
  MyContextProviderState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    this.state = {
      users: ['Rysh', 'May', 'Kate'],
    };
  }

  handleUpdateUser = (user: string): void => {
    const { users } = this.state;
    this.setState({
      users: [...users, user],
    });
  };

  render(): ReturnComponentType {
    const { users } = this.state;
    const { children } = this.props;
    return (
      <MyContext.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ users, updateUser: this.handleUpdateUser }}
      >
        {children}
      </MyContext.Provider>
    );
  }
}
