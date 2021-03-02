import * as React from 'react';
import { FormContext } from './FormContext';
import { FormContextValue } from './types';

export const createUseForm = <E>() => <F, P = {}, C = {}>() => {
  return React.useContext<FormContextValue<F, E, P, C>>(FormContext);
};
