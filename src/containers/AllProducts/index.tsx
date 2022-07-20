import { FC, ReactNode, useCallback, useEffect } from 'react';

import { AllProductsSideBar, Pagination, ProductCard } from '../../components';
import ShopAction from '../../store/actions/ShopAction';
import UserAction from '../../store/actions/UserAction';
import { Product, ProductFilters } from '../../store/reducers/shopReducer';
import { ProductPurchase } from '../../store/reducers/userReducer';

import './style.css';

import { useAppDispatch, useAppSelector } from 'store';
import { ReturnComponentType } from 'types';

const AllProducts: FC = (): ReturnComponentType => {
  const { shop, user } = useAppSelector(
    state => state,
    (prevState, currentState) => {
      const { shop: prevShop, user: prevUser } = prevState;
      const { shop: nextShop, user: nextUser } = currentState;

      return (
        nextShop.shopProducts === prevShop.shopProducts &&
        nextShop.productFilters === prevShop.productFilters &&
        nextUser.filters === prevUser.filters &&
        nextUser.shopProductsPage === prevUser.shopProductsPage
      );
    },
  );

  const dispatch = useAppDispatch();
  const { shopProducts, productFilters } = shop;
  const { filters: userFilters, shopProductsPage: userSelectedPage } = user;
  const { fetchShopProductsAndFilters } = new ShopAction();
  const { updateUserFilters, updateUserShopProductsPage, addToCart } = new UserAction();

  useEffect(() => {
    if (!shopProducts.products.length) {
      dispatch(fetchShopProductsAndFilters());
    }
  }, []);

  const handleAddToCart = (productPurchase: ProductPurchase): void => {
    dispatch(addToCart(productPurchase));
  };

  const renderAllProductsList = (): ReactNode =>
    shopProducts.products.map((product: Product) => (
      <div key={product.id} className="product-item-container">
        <ProductCard product={product} addToCart={handleAddToCart} />
      </div>
    ));

  const handlePageChange = (selectedPage: number): void => {
    if (selectedPage !== userSelectedPage) {
      dispatch(updateUserShopProductsPage(selectedPage));
    }
  };

  const handleUpdateUserFilters = useCallback((filters: ProductFilters): void => {
    dispatch(updateUserFilters(filters));
  }, []);

  return (
    <div className="all-products-page-container">
      <AllProductsSideBar
        onUpdateUserFilters={handleUpdateUserFilters}
        userFilters={userFilters}
        productFilters={productFilters}
      />

      <div className="all-products-container">
        <div className="all-products">{renderAllProductsList()}</div>
        <Pagination
          overrideSelectedPage={userSelectedPage}
          onChange={handlePageChange}
          numberOfPages={shopProducts.totalPages}
        />
      </div>
    </div>
  );
};

export default AllProducts;
