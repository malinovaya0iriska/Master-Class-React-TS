/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { CheckboxProps, CheckboxState } from './types';

import './style.css';
import { ReturnComponentType } from 'types';

export class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
  constructor(props: CheckboxProps) {
    super(props);
    this.state = {
      value: props.initialValue || false,
    };
  }

  handleCheckboxClick = (): void => {
    const { value } = this.state;
    const { onChange } = this.props;
    const newValue = !value;
    this.setState({ value: newValue });

    onChange(newValue);
  };

  render(): ReturnComponentType {
    const { value } = this.state;
    const iconClassName = value ? 'fa fa-check-square' : 'fa fa-square-o';
    const { children } = this.props;
    return (
      <label
        className="checkbox-container"
        onClick={this.handleCheckboxClick}
        onKeyDown={this.handleCheckboxClick}
      >
        <i className={`${iconClassName} checkbox-icon`} aria-hidden="true" />
        <span className="checkbox-children">{children}</span>
      </label>
    );
  }
}
