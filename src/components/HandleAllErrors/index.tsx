/* eslint-disable react/jsx-props-no-spreading */
import { Component, ReactNode } from 'react';

import { useNavigate } from 'react-router-dom';

import { ROUTE } from '../../constants/routes';
import { ReturnComponentType } from '../../types';

declare namespace JSX {
  export interface IntrinsicAttributes {
    [elemName: string]: any;
  }
}

class HandleAllErrors extends Component<{
  children: ReactNode;
  navigate: any;
}> {
  componentDidCatch(): void {
    const { navigate } = this.props;
    navigate(ROUTE.ERROR);
  }

  render(): ReturnComponentType {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

const withRouter = (WrappedComponent: any) => (props: JSX.IntrinsicAttributes) => {
  const navigate = useNavigate();
  return <WrappedComponent {...props} navigate={navigate} />;
};

export default withRouter(HandleAllErrors);
