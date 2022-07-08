import { forwardRef, useImperativeHandle, useState } from 'react';

import { ONE, ZERO } from 'constants/index';

export interface ChildComponentRef {
  handleButtonClick(): void;
}

export const ChildComponent = forwardRef<ChildComponentRef>((props, ref) => {
  const [counter, setCounter] = useState(ZERO);

  const handleButtonClick = (): void => {
    setCounter(counter + ONE);
  };

  useImperativeHandle(
    ref,
    () => ({
      handleButtonClick,
    }),
    [counter],
  );

  return (
    <section>
      <h2>Child Component</h2>
      <p> Counter: {counter}</p>

      <button type="button" onClick={handleButtonClick}>
        Update Counter
      </button>
    </section>
  );
});
