import * as React from 'react';

import { FormContextValue } from './types';

export const FormContext = React.createContext<FormContextValue<any, any, any, any>>({
  formId: undefined,
  formState: {},
  formData: {},
  payload: {},
  connectedData: {},
  ready: false,
  setValue: () => {},
  setError: () => {},
  registerField: () => {},
  updateField: () => {},
  unregisterField: () => {},
  registerArrayField: () => {},
  removeArrayItem: () => {},
  handleSubmit: () => Promise.resolve(),
  submitHandler: () => () => {},
  setConstraints: () => {},
  validateField: () => null,
  setPayload: () => null,
  reinit: () => {},
  clear: () => {},
  setMountedFields: () => {},
});
