import { Component, createContext, ReactNode } from 'react';

import ReactDOM from 'react-dom';

import { ReturnComponentType } from 'types';

import './style.css';

export type ThemeContextValue = 'light' | 'dark';

export const ThemeContext = createContext<ThemeContextValue>('light');
export interface ThemeContextProviderState {
  theme: ThemeContextValue;
}

export class ThemeContextProvider extends Component<
  { children: ReactNode },
  ThemeContextProviderState
> {
  root: HTMLDivElement;

  el: HTMLElement;

  body: HTMLBodyElement;

  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = {
      theme: 'light',
    };

    this.root = document.querySelector('#root') as HTMLDivElement;
    this.el = document.createElement('div');
    this.body = document.querySelector('body') as HTMLBodyElement;
  }

  componentDidMount(): void {
    this.root.appendChild(this.el);
  }

  componentWillUnmount(): void {
    this.root.removeChild(this.el);
  }

  handleChangeTheme = (): void => {
    const { theme } = this.state;
    this.setState({
      theme: theme === 'light' ? 'dark' : 'light',
    });
  };

  render(): ReturnComponentType {
    const { theme } = this.state;
    const { children } = this.props;

    const isLightTheme = theme === 'light';
    this.body.style.backgroundColor = isLightTheme ? 'white' : 'black';

    const iconClassName = isLightTheme ? 'fa-sun-o' : 'fa-moon-o';

    const themeButton = ReactDOM.createPortal(
      <i
        onClick={this.handleChangeTheme}
        className={`fa ${iconClassName} theme-context-button ${theme}`}
        aria-hidden="true"
      />,
      this.el,
    );

    return (
      <ThemeContext.Provider value={theme}>
        <div className={`app-container ${theme}`}>{children}</div>
        {themeButton}
      </ThemeContext.Provider>
    );
  }
}
