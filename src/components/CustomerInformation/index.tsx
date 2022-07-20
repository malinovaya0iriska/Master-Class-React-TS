/* eslint-disable no-unused-expressions */
import React, { FC, ReactNode, useMemo, useRef, useState } from 'react';

import update from 'immutability-helper';
import { Link } from 'react-router-dom';

import ShopAPI from '../../api';
import { ROUTE } from '../../constants/routes';
import {
  CustomerInformationField,
  CustomerInformationFieldsList,
  CUSTOMER_INFORMATION_FIELDS_LIST,
  CUSTOMER_INFORMATION_FIELD_ERROR,
  CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
  CUSTOMER_INFORMATION_FIELD_WIDTH,
} from '../../constants/user';
import { Button, Input, Modal } from '../../ui-components';

import { CustomerInformationFieldRefs, CustomerInformationProps } from './types';

import { initializeFieldRefs } from 'components/CustomerInformation/utils';

import './style.css';

export const CustomerInformation: FC<CustomerInformationProps> = ({
  cart,
  cleanCart,
}) => {
  const fieldsList = useMemo(() => Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST), []);

  const initialFieldRefs = useMemo(initializeFieldRefs, []);
  const fieldRefs = useRef<CustomerInformationFieldRefs>(initialFieldRefs);
  const [fieldState, setFieldState] = useState<CustomerInformationFieldsList>({
    ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
  });
  const [fieldError, setFieldError] = useState<CustomerInformationFieldsList>({
    ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
  });
  const [hasCompletePurchaseClick, setHasCompletePurchaseClick] = useState(false);
  const [showThankyouModal, setShowThankyouModal] = useState(false);

  const validateInputField = (field: CustomerInformationField, value: string): void => {
    const errorMessage = value ? '' : CUSTOMER_INFORMATION_FIELD_ERROR;

    setFieldError(update(fieldError, { [field]: { $set: errorMessage } }));
  };

  const handleInputOnChange =
    (field: CustomerInformationField) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      setFieldState(update(fieldState, { [field]: { $set: value } }));

      hasCompletePurchaseClick && validateInputField(field, value);
    };

  const renderInputFields = (): ReactNode =>
    fieldsList.map(field => {
      const customerInfoField = field as CustomerInformationField;
      const label = CUSTOMER_INFORMATION_FIELDS_LIST[customerInfoField];

      return (
        <Input
          key={label}
          inputContainerStyle={{ marginBottom: '10px' }}
          inputStyle={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
          label={label}
          onChange={handleInputOnChange(customerInfoField)}
          error={fieldError[customerInfoField]}
          positive={!!fieldState[customerInfoField]}
          inputRef={fieldRefs.current[customerInfoField]}
        />
      );
    });

  const allFieldsAreValid = (): boolean => {
    let hasError = false;
    const error: CustomerInformationFieldsList = {
      ...CUSTOMER_INFORMATION_FIELD_INITIAL_STATE,
    };

    let hasFocusToErrorField = false;

    fieldsList.forEach(key => {
      const stateKey = key as CustomerInformationField;

      if (!fieldState[stateKey]) {
        error[stateKey] = CUSTOMER_INFORMATION_FIELD_ERROR;
        hasError = true;

        if (!hasFocusToErrorField) {
          hasFocusToErrorField = true;
          const fieldRef = fieldRefs.current[stateKey];
          fieldRef.current && fieldRef.current.focus();
        }
      }
    });

    setFieldError(error);

    return !hasError;
  };

  const handleButtonClick = (): void => {
    setHasCompletePurchaseClick(true);
    if (allFieldsAreValid()) {
      const shopApi = new ShopAPI();

      shopApi
        .postOrder({
          cart,
          user: fieldState,
        })
        .then(() => {
          setShowThankyouModal(true);
        });
    }
  };

  const handleShopMoreClick = (): void => {
    cleanCart();
  };

  return (
    <div className="customer-info-container">
      <div className="heading text">Billing Information</div>
      {renderInputFields()}
      <Button
        style={{ width: CUSTOMER_INFORMATION_FIELD_WIDTH }}
        styleType="primary"
        onClick={handleButtonClick}
        className="complete-purchase-btn"
      >
        Complete Purchase
      </Button>
      <Modal modalBodyClassName="customer-info-modal-body" show={showThankyouModal}>
        <div className="header">Thank you! We have received your order!</div>
        <p>Please wait 5 to 10 business days for your items to arrived.</p>
        <Link to={ROUTE.ALL_PRODUCTS}>
          <Button styleType="primary" onClick={handleShopMoreClick}>
            Shop More
          </Button>
        </Link>
      </Modal>
    </div>
  );
};
