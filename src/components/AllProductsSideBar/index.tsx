import React, { memo, ReactNode } from 'react';

import update from 'immutability-helper';

import { ProductFilters } from '../../store/reducers';
import { Checkbox } from '../../ui-components';
import { upperCaseFirstLetter } from '../../utils/index';

import './style.css';
import { ProductFiltersProps } from './types';

export const AllProductsSideBar: React.FC<ProductFiltersProps> = memo(
  ({ productFilters, userFilters, onUpdateUserFilters }) => {
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
                (val: string) => val !== filterValue,
              ),
            },
          });
        }

        onUpdateUserFilters(newUserFilters);
      };

    const renderFilters = (): ReactNode =>
      Object.keys(productFilters).map((filterCategory: string) => {
        const filterValues = productFilters[filterCategory as keyof ProductFilters];

        return (
          <div key={filterCategory} className="product-filter">
            <p>{upperCaseFirstLetter(filterCategory)}</p>
            {filterValues.map((filterValue: string) => (
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
  },
);
