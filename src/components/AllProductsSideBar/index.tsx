import React, { ReactNode } from 'react';

import update from 'immutability-helper';

import { ProductFiltersProps } from './types';

import { ProductFilters } from 'store/reducers';
import { Checkbox } from 'ui-components';
import { upperCaseFirstLetter } from 'utils';
import './style.css';

export const AllProductsSideBar: React.FC<ProductFiltersProps> = ({
  productFilters,
  userFilters,
  onUpdateUserFilters,
}) => {
  const handleFilterChange =
    (filterCategory: string, filterValue: string) => (value: boolean) => {
      let newUserFilters: ProductFilters;

      if (value) {
        newUserFilters = update(userFilters, {
          [filterCategory]: { $push: [filterValue] },
        });
      } else {
        newUserFilters = update(userFilters, {
          [filterCategory]: {
            $set: userFilters[filterCategory as keyof ProductFilters].filter(
              val => val !== filterValue,
            ),
          },
        });
      }

      onUpdateUserFilters(newUserFilters);
    };

  const renderFilters = (): ReactNode =>
    Object.keys(productFilters).map(filterCategory => {
      const filterValues = productFilters[filterCategory as keyof ProductFilters];

      return (
        <div key={filterCategory} className="product-filter">
          <p>{upperCaseFirstLetter(filterCategory)}</p>
          {filterValues.map(filterValue => (
            <div key={filterValue} className="filter-checkbox">
              <Checkbox onChange={handleFilterChange(filterCategory, filterValue)}>
                {filterValue}
              </Checkbox>
            </div>
          ))}
        </div>
      );
    });

  return <div className="all-products-side-bar">{renderFilters()}</div>;
};
