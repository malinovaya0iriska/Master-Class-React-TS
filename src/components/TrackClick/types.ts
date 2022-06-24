import React from 'react';

export type TrackClickProps = {
  renderProps(click: number): React.ReactElement;
};
export type TrackClickState = {
  click: number;
};
