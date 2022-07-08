import { FC, useEffect, useState } from 'react';

import { exprensiveCalculateInitialValue } from 'components/helpers/index';
import { ONE, ZERO } from 'constants/index';

export const WithUseEffectVariants: FC = () => {
  const [counter, setCounter] = useState(ZERO);
  const [counter2, setCounter2] = useState(() => exprensiveCalculateInitialValue()); // compare with  useState(exprensiveCalculateInitialValue());

  const handleOnClickCounter = (): void => {
    setCounter((value: number) => value + ONE);
  };

  const handleOnClickCounter2 = (): void => {
    setCounter2((value: number) => value + ONE);
  };

  console.log('render');

  //   useEffect(() => {
  //     console.log('useEffect for every render');
  //   });
  //
  //   useEffect(() => {
  //     console.log('useEffect once after loading');
  //   }, []);
  //
  //   useEffect(() => {
  //     console.log('useEffect depends on counter');
  //   }, [counter]);
  //
  //   useEffect(() => {
  //     console.log('useEffect depends on CLICK ANYWHERE');
  //   }, [window.addEventListener('click', handleOnClickCounter)]);

  useEffect(() => {
    window.addEventListener('click', handleOnClickCounter);
    console.log('addEventListener');

    return () => {
      window.removeEventListener('click', handleOnClickCounter);
      console.log('removeEventListener');
    };
  }, [counter2]);

  return (
    <>
      <section>
        <p> Counter: {counter}</p>
        <button type="button" onClick={handleOnClickCounter}>
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
