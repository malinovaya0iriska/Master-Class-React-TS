import { useDebugValue, useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T): T => {
  const previousValue = useRef<T>(value);

  useEffect(() => {
    previousValue.current = value;
  });

  useDebugValue(previousValue.current, val => {
    throw new Error('Error');
    return `Value:${val}`;
  });

  return previousValue.current;
};
