import { GetProducsOptions } from 'api';
import { FetchShopProductsAction } from 'store/actions';
import { ProductFilters, ProductPurchase, ShopProducts } from 'store/reducers';

export interface AllProductsStateProps {
  shopProducts: ShopProducts;
  productFilters: ProductFilters;
  userFilters: ProductFilters;
  userSelectedPage: number;
}

export interface AllProductsDispatchToProps {
  fetchShopProducts(options: GetProducsOptions): FetchShopProductsAction;
  fetchShopProductsAndFilters(): any;
  updateUserFilters(filters: ProductFilters): any;
  updateUserShopProductsPage(page: number): any;
  addToCart(product: ProductPurchase): any;
}

export type AllProductsPageProps = AllProductsStateProps & AllProductsDispatchToProps;
