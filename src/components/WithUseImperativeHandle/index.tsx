import { FC, useRef, useState } from 'react';

import { ChildComponent } from './ChildComponent';
import type { ChildComponentRef } from './ChildComponent';

import { ONE, ZERO } from 'constants/index';

export const WithUseImperativeHandle: FC = () => {
  const [counter, setCounter] = useState(ZERO);
  const childCompRef = useRef<ChildComponentRef>(null);

  const handleButtonClick = (): void => {
    setCounter(counter + ONE);
  };

  const handleChildButtonClick = (): void => {
    // eslint-disable-next-line no-unused-expressions
    childCompRef.current && childCompRef.current.handleButtonClick();
  };

  return (
    <section>
      <h1>useImperativeHandle</h1>
      <h2>Parent</h2>
      <p> Counter: {counter}</p>
      <button type="button" onClick={handleButtonClick}>
        Update
      </button>

      <button type="button" onClick={handleChildButtonClick}>
        Update Child Component
      </button>
      <ChildComponent ref={childCompRef} />
    </section>
  );
};
