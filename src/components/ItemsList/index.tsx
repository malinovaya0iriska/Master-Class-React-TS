import { Component } from 'react';

import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';

import {
  ItemsDispatchProps,
  ItemsListProps,
  ItemsListStateProps,
  UnionItemsListProps,
} from 'components/ItemsList/type';
import ItemsActions from 'store/action/itemsAction';
import { AppStoreType } from 'store/store';
import { ReturnComponentType } from 'types';

class ItemsList extends Component<UnionItemsListProps> {
  constructor(props: UnionItemsListProps) {
    super(props);
    this.state = {};
  }

  clickAddItem = (): void => {
    const { addItem } = this.props;
    addItem(['parfum', 'notepade']);
  };

  render(): ReturnComponentType {
    const { ownerName, items } = this.props;

    return (
      <div>
        <h2>{ownerName}</h2>
        <ul>
          {items.map((item: string) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <button onClick={this.clickAddItem} type="button">
          Add Item
        </button>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<
  ItemsListStateProps,
  ItemsListProps,
  AppStoreType
> = (state, ownProps) => {
  console.log('mapStateToProps', ownProps);

  return {
    items: state.items,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  ItemsDispatchProps,
  ItemsListProps
> = (dispatch, ownProps) => {
  console.log('mapStateToProps', ownProps);
  const itemsActions = new ItemsActions();

  return {
    addItem: (payload: string[]) => dispatch(itemsActions.addItems(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
