import { ZERO } from 'constants/index';

/* eslint-disable @typescript-eslint/no-magic-numbers */
export const exprensiveCalculateInitialValue = (): number => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 1000; i++) {
    const j = i + 1;
    console.log(j);
  }
  return ZERO;
};
