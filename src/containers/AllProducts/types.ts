import { ProductDetails } from 'store/reducers';

export type AllProductsPageProps = AllProductsStateProps; // & AllProductsOwnProps;

export interface AllProductsStateProps {
  productDetails?: ProductDetails;
}
// export interface AllProductsOwnProps extends RouteChildrenProps {}
