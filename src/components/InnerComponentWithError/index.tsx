/* eslint-disable no-unreachable */
import { Component } from 'react';

import { ReturnComponentType } from 'types';

export class InnerComponentWithError extends Component {
  static getDerivedStateFromError(error: Error): null {
    console.log('getDerivedStateFromError', error);

    return null;
  }

  render(): ReturnComponentType {
    throw new Error('Planned Error');
  }
}
