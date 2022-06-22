import { FC, memo } from 'react';

import { MyReactMemoProps } from 'components/MyReactMemo/types';

const MyReactMemo: FC<MyReactMemoProps> = ({ name, address }) => {
  console.log('MyReactMemo render');
  return (
    <>
      <h1>My React Memo</h1>
      <p>Name: {name}</p>
      <p>City: {address.city}</p>
      <p>Street: {address.street}</p>
    </>
  );
};

export default memo<MyReactMemoProps>(
  MyReactMemo,
  (prevProps, nextProps) =>
    prevProps.name === nextProps.name &&
    prevProps.address.city === nextProps.address.city &&
    prevProps.address.street === nextProps.address.street,
);
