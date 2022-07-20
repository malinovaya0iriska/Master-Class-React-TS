import { FC, ReactNode, useEffect } from 'react';

import { ProductCard } from '../../components';
import { ShopAction, UserAction } from '../../store/actions';
import { Product, ProductPurchase } from '../../store/reducers';
import './style.css';

import { useAppDispatch, useAppSelector } from 'store';
import { ReturnComponentType } from 'types';

const BestSeller: FC = (): ReturnComponentType => {
  const { bestSellerProducts } = useAppSelector(state => state.shop);
  const dispatch = useAppDispatch();

  const { addToCart } = new UserAction();
  const { fetchAllBestSellerProducts } = new ShopAction();

  const handleAddToCart = (productPurchase: ProductPurchase): void => {
    dispatch(addToCart(productPurchase));
  };

  const renderBestSellerProducts = (): ReactNode =>
    bestSellerProducts.map((product: Product) => (
      <ProductCard key={product.id} product={product} addToCart={handleAddToCart} />
    ));

  useEffect(() => {
    if (!bestSellerProducts.length) {
      dispatch(fetchAllBestSellerProducts());
    }
  }, []);

  return (
    <div className="best-seller-container">
      <h2>Best Seller</h2>
      <div className="best-seller-products">{renderBestSellerProducts()}</div>
    </div>
  );
};

export default BestSeller;
