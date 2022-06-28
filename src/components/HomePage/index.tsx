import { FC } from 'react';

import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

import { HomePageProps } from './types';

export const HomePage: FC<HomePageProps> = () => (
  <>
    <h1>Home Page</h1>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <p>Button Group </p>
    <ButtonGroup>
      <Button type="primary"> Primary</Button>
      <Button> Default</Button>
    </ButtonGroup>
  </>
);
