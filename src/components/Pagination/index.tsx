import React, { ReactNode } from 'react';

import { PaginationProps, PaginationState } from './types';

import { ONE } from 'constants/index';
import { ThemeContext } from 'context/ThemeContext';
import { ReturnComponentType } from 'types';
import { Button } from 'ui-components';
import './style.css';

export class Pagination extends React.Component<PaginationProps, PaginationState> {
  constructor(props: PaginationProps) {
    super(props);

    this.state = {
      selectedPage: 1,
    };
  }

  currentSelectedPage = (): number => {
    const { overrideSelectedPage } = this.props;
    const { selectedPage } = this.state;

    return overrideSelectedPage || selectedPage;
  };

  handlePreviousClick = (): void => {
    const currentSelectedPage = this.currentSelectedPage();
    const { onChange } = this.props;

    const newPage =
      currentSelectedPage === ONE ? currentSelectedPage : currentSelectedPage - ONE;

    this.setState({ selectedPage: newPage });
    onChange(newPage);
  };

  handleNextClick = (): void => {
    const { numberOfPages, onChange } = this.props;

    const currentSelectedPage = this.currentSelectedPage();

    const newPage =
      currentSelectedPage === numberOfPages
        ? currentSelectedPage
        : currentSelectedPage + ONE;

    this.setState({ selectedPage: newPage });
    onChange(newPage);
  };

  pageClick = (page: number) => () => {
    const { selectedPage } = this.state;
    const { onChange } = this.props;

    if (selectedPage !== page) {
      this.setState({ selectedPage: page });
      onChange(page);
    }
  };

  renderPageButtons = (): ReactNode => {
    const { numberOfPages } = this.props;

    const currentSelectedPage = this.currentSelectedPage();

    return [...new Array(numberOfPages)].map((value, index) => {
      const page = index + ONE;

      return (
        <Button
          key={page}
          selected={currentSelectedPage === page}
          onClick={this.pageClick(page)}
          className="page-button"
        >
          {page}
        </Button>
      );
    });
  };

  render(): ReturnComponentType {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <div className={`pagination-container ${theme}`}>
            <i
              onClick={this.handlePreviousClick}
              className="fa fa-caret-left page-caret"
              aria-hidden="true"
            />
            <div className="pages-container">{this.renderPageButtons()}</div>
            <i
              onClick={this.handleNextClick}
              className="fa fa-caret-right page-caret"
              aria-hidden="true"
            />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
