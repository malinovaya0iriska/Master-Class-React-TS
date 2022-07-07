import { FC } from 'react';

import './style.css';
import { HomePageProps } from './types';

import { Partners, ShopQuality } from 'components';
import { BestSeller } from 'containers';

const HomePage: FC<HomePageProps> = () => (
  <div className="homepage-container">
    <div className="cover-image" />
    <ShopQuality />
    <BestSeller />
    <Partners />
  </div>
);

export default HomePage;
