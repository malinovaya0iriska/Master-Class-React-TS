import { Component } from 'react';

import { TrackClickProps, TrackClickState } from 'components/TrackClick/types';
import { ONE } from 'constants/index';
import { ReturnComponentType } from 'types';

export class TrackClick extends Component<TrackClickProps, TrackClickState> {
  constructor(props: TrackClickProps) {
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
    const { renderProps } = this.props;
    const { click } = this.state;
    return (
      <div onClick={this.handleOnTrackClick} role="presentation">
        <h1>Amount of clicks: {renderProps(click)}</h1>
      </div>
    );
  }
}
