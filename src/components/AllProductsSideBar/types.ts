import { ProductFilters } from '../../store/reducers';

export interface ProductFiltersProps {
  productFilters: ProductFilters;
  userFilters: ProductFilters;
  onUpdateUserFilters(filters: ProductFilters): any;
}
