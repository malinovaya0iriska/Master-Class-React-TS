import { useEffect, FC, useState } from 'react';

import { ONE, ZERO } from 'constants/index';
import { usePrevious } from 'hooks/usePrevious';

export const WithUseDebug: FC = () => {
  const [counter, setCounter] = useState(ZERO);
  const previousValue = usePrevious(counter);

  const handleButtonClick = (): void => {
    setCounter(counter + ONE);
  };

  useEffect(() => {
    console.log('Previous:', previousValue);
    console.log('Current:', counter);
  });

  return (
    <div>
      <h1>useDebug demo</h1>
      <p>Counter: {counter}</p>
      <button type="button" onClick={handleButtonClick}>
        Add Value
      </button>
    </div>
  );
};
