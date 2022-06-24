import { FC } from 'react';

import { withTrackClick } from '../../hoc/withTrackClick';

import { WrapperComponentProps } from 'hoc/types';
import { ReturnComponentType } from 'types';

const WrappedWithHOC: FC<WrapperComponentProps> = ({ click }): ReturnComponentType => (
  <>
    <h4>This is wrapped with HOC to count clicks.</h4>
    <p>{click}</p>
  </>
);

export default withTrackClick(WrappedWithHOC);
