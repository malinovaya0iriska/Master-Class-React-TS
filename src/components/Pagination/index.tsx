import { FC, ReactNode, useContext, useState } from 'react';

import { ONE } from '../../constants/index';
import { ThemeContext } from '../../context/ThemeContext';
import { Button } from '../../ui-components';

import './style.css';
import { PaginationProps } from './types';

import { ReturnComponentType } from 'types';

export const Pagination: FC<PaginationProps> = ({
  overrideSelectedPage,
  onChange,
  numberOfPages,
}): ReturnComponentType => {
  const [selectedPage, setSelectedPage] = useState(ONE);
  const theme = useContext(ThemeContext);

  const getCurrentSelectedPage = (): number => overrideSelectedPage || selectedPage;

  const handlePreviousClick = (): void => {
    const currentSelectedPage = getCurrentSelectedPage();

    const newPage =
      currentSelectedPage === ONE ? currentSelectedPage : currentSelectedPage - ONE;

    setSelectedPage(newPage);
    onChange(newPage);
  };

  const handleNextClick = (): void => {
    const currentSelectedPage = getCurrentSelectedPage();

    const newPage =
      currentSelectedPage === numberOfPages
        ? currentSelectedPage
        : currentSelectedPage + ONE;

    setSelectedPage(newPage);
    onChange(newPage);
  };

  const pageClick = (page: number) => () => {
    if (selectedPage !== page) {
      setSelectedPage(page);
      onChange(page);
    }
  };

  const renderPageButtons = (): ReactNode => {
    const currentSelectedPage = getCurrentSelectedPage();

    return [...new Array(numberOfPages)].map((value, index) => {
      const page = index + ONE;

      return (
        <Button
          key={page}
          selected={currentSelectedPage === page}
          onClick={pageClick(page)}
          className="page-button"
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className={`pagination-container ${theme}`}>
      <i
        onClick={handlePreviousClick}
        className="fa fa-caret-left page-caret"
        aria-hidden="true"
      />
      <div className="pages-container">{renderPageButtons()}</div>
      <i
        onClick={handleNextClick}
        className="fa fa-caret-right page-caret"
        aria-hidden="true"
      />
    </div>
  );
};
