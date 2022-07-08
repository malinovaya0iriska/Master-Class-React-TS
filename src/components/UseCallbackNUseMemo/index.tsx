import { FC, useMemo, useState } from 'react';

import { ONE, ZERO } from 'constants/index';

export const UseCallbackNUseMemo: FC = () => {
  const [counter, setCounter] = useState(ZERO);
  const [counter2, setCounter2] = useState(ZERO);

  const handleOnClickCounter = (): void => {
    setCounter(counter + ONE);
  };

  const handleOnClickCounter2 = (): void => {
    setCounter2((value: number) => value + ONE);
  };

  // const memoizedCbck = useCallback(handleOnClickCounter, []);
  // const memoizedCbck = useCallback(handleOnClickCounter, [counter]);

  const anotherMemoizedCbck = useMemo(() => handleOnClickCounter, []);

  return (
    <>
      <section>
        <p> Counter: {counter}</p>
        <button type="button" onClick={anotherMemoizedCbck}>
          Add value
        </button>
      </section>

      <section>
        <p> Counter_2: {counter2}</p>
        <button type="button" onClick={handleOnClickCounter2}>
          Add value
        </button>
      </section>
    </>
  );
};
