import { FC } from 'react';

import './App.css';
import { ReturnComponentType } from './types';

import { WithUseDebug } from 'components/WithUseDebug';

export const App: FC = (): ReturnComponentType => {
  console.log('APP');

  return (
    <div className="App">
      {/* <WithUseEffectVariants /> */}
      {/* <LayoutEffectVSUseEffect /> */}
      {/* <UseCallbackNUseMemo /> */}
      {/* <WithUseRef /> */}
      {/* <WithUseImperativeHandle /> */}
      {/* <WithUseReducer /> */}
      <WithUseDebug />
    </div>
  );
};
