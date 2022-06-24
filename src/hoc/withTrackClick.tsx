/* eslint-disable react/jsx-props-no-spreading */
import { Component, FC } from 'react';

import { ONE } from 'constants/index';
import {
  withTrackClickProps,
  withTrackClickState,
  WrapperComponentProps,
} from 'hoc/types';
import { ReturnComponentType } from 'types';

export const withTrackClick = <T extends unknown>(
  WrapperComponent: FC<WrapperComponentProps & T>,
): any =>
  class extends Component<withTrackClickProps & T, withTrackClickState> {
    constructor(props: withTrackClickProps & T) {
      super(props);

      this.state = {
        click: 0,
      };
    }

    handleOnTrackClick = (): void => {
      const { click } = this.state;
      this.setState({ click: click + ONE });
    };

    render(): ReturnComponentType {
      const { click } = this.state;
      return (
        <div onClick={this.handleOnTrackClick} role="presentation">
          <WrapperComponent {...this.props} click={click} />{' '}
        </div>
      );
    }
  };
