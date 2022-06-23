import { FC } from 'react';

import { HomePageProps } from './types';

import { Button } from 'components/Button';
import { ButtonGroup } from 'components/ButtonGroup';

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
