import { FC, useLayoutEffect, useState } from 'react';

import { ONE, ZERO } from 'constants/index';

export const LayoutEffectVSUseEffect: FC = () => {
  const [counter, setCounter] = useState(ZERO);

  const handleOnClickCounter = (): void => {
    setCounter((value: number) => value + ONE);
  };

  // useEffect(() => {
  //   if (counter === ZERO) {
  //     setCounter(ONE);
  //   }
  // }, []);

  useLayoutEffect(() => {
    if (counter === ZERO) {
      setCounter(ONE);
    }
  });

  return (
    <section>
      <h1>_UseLayout VS UseEffect</h1>
      <p> Counter: {counter}</p>
      <button type="button" onClick={handleOnClickCounter}>
        Add value
      </button>
    </section>
  );
};
