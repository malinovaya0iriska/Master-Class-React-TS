/* eslint-disable @typescript-eslint/no-magic-numbers */
import { ProductFilters } from 'store/reducers';

export const upperCaseFirstLetter = (str: string): string =>
  str[0].toUpperCase() + str.substr(1).toLowerCase();

export const convertFiltersToCategories = (filters: ProductFilters): string[] => {
  let categories: string[] = [];

  Object.keys(filters).forEach(filterCategory => {
    const categoryFilters = filters[filterCategory as keyof ProductFilters];
    if (categoryFilters.length) {
      categories = categories.concat(categoryFilters);
    }
  });

  return categories;
};

export const omit = (obj: any, keysToOmit: string[]): any => {
  const newObj: any = {};

  Object.keys(obj).forEach(key => {
    if (!keysToOmit.includes(key)) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
