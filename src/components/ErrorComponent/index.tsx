/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unreachable */
import { Component } from 'react';

import { ReturnComponentType } from 'types';

export class ErrorComponent extends Component {
  render(): ReturnComponentType {
    return <h4>ERROR</h4>;
  }
}
