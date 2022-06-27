import { Dispatch } from 'redux';

export type ItemsListProps = {
  ownerName: string;
};

export type ItemsListStateProps = {
  items: string[];
};

export type UnionItemsListProps = ItemsListProps &
  ItemsListStateProps & { dispatch: Dispatch };

export type ItemsDispatchProps = {
  addItem: (items: string[]) => void;
};
