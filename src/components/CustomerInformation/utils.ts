import { createRef } from 'react';

import {
  CustomerInformationField,
  CUSTOMER_INFORMATION_FIELDS_LIST,
} from '../../constants/user';

import { CustomerInformationFieldRefs } from './types';

export const initializeFieldRefs = (): CustomerInformationFieldRefs => {
  const refs = {} as CustomerInformationFieldRefs;

  Object.keys(CUSTOMER_INFORMATION_FIELDS_LIST).forEach(key => {
    const stateKey = key as CustomerInformationField;
    refs[stateKey] = createRef();
  });

  return refs;
};
