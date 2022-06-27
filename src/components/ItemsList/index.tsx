import { Component } from 'react';

import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';

import {
  ItemsDispatchProps,
  ItemsListProps,
  ItemsListStateProps,
  UnionItemsListProps,
} from 'components/ItemsList/type';
import { ADD_ITEM } from 'reduxData/itemReducer';
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

const mapStateToProps: MapStateToProps<ItemsListStateProps, ItemsListProps, string[]> = (
  state,
  ownProps,
) => {
  console.log('mapStateToProps', ownProps);

  return {
    items: state,
  };
};

const mapDispatchToProps: MapDispatchToPropsFunction<
  ItemsDispatchProps,
  ItemsListProps
> = (dispatch, ownProps) => {
  console.log('mapDispatchToProps', ownProps);

  return {
    addItem: payload => dispatch({ type: ADD_ITEM, payload }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
