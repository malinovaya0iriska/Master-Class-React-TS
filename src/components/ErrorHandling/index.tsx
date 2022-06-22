import { Component } from 'react';

import { ErrorComponent, InnerComponentWithError } from 'components';
import { ErrorHandlingProps, ErrorHandlingState } from 'components/ErrorHandling/types';
import { ReturnComponentType } from 'types';

export class ErrorHandling extends Component<ErrorHandlingProps, ErrorHandlingState> {
  constructor(props: ErrorHandlingProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  // static getDerivedStateFromError(error: Error): ErrorHandlingState {
  //   console.log('getDerivedStateFromError', error);

  //   return { hasError: true };
  // }

  // componentDidCatch(error: Error, info: ErrorInfo): void {
  //   console.log('componentDidCatch', error);
  //   console.log('componentDidCatch', info);
  // }

  render(): ReturnComponentType {
    const { hasError } = this.state;
    return (
      <>
        <h1>First Component with ErrorHanling</h1>
        {hasError ? <ErrorComponent /> : <InnerComponentWithError />}
      </>
    );
  }
}
