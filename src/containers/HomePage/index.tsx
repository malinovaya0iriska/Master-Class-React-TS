import { FC } from 'react';

import './style.css';

import { Partners, ShopQuality } from '../../components';
import BestSeller from '../BestSeller';

const HomePage: FC = () => (
  <div className="homepage-container">
    <div className="cover-image" />
    <ShopQuality />
    <BestSeller />
    <Partners />
  </div>
);

export default HomePage;
