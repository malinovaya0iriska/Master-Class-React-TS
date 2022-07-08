import { FC, useState } from 'react';

import { ONE, ZERO } from 'constants/index';

export type ButtonRefType = HTMLButtonElement | null;

export const WithUseRef: FC = () => {
  const [counter, setCounter] = useState(ZERO);
  const [buttonWidth, setButtonWidth] = useState<number>(ZERO);

  // const buttonRef = useRef<ButtonRefType>(null);

  const handleOnClickCounter = (): void => {
    setCounter(counter + ONE);
  };

  const buttonCallbackRef = (element: ButtonRefType): void => {
    if (element !== null) {
      setButtonWidth(element.clientWidth);
    }
  };

  return (
    <section>
      <h1>useRef</h1>
      <p> Counter_2: {counter}</p>
      <p>Button Width: {buttonWidth}</p>
      <button type="button" ref={buttonCallbackRef} onClick={handleOnClickCounter}>
        Update
      </button>
    </section>
  );
};
