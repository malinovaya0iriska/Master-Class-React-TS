export type ItemsListProps = {
  ownerName: string;
};

export type ItemsListStateProps = {
  items: string[];
};

export type UnionItemsListProps = ItemsListProps &
  ItemsListStateProps &
  ItemsDispatchProps;

export type ItemsDispatchProps = {
  addItem: (items: string[]) => void;
};
