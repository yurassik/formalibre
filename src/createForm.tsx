import * as React from 'react';

import { FormMakeConfig, FormProps, FormComponentProps } from './types';
import { FormContext } from './FormContext';
import { useFormEngine } from './useFormEngine';

export const createForm = <E, >(params: FormMakeConfig<E>) => (
  FormComponent: React.ComponentType<FormComponentProps>,
) => {
  const Form = <FD, PLD = any, CD = any>(props: React.PropsWithChildren<FormProps<Partial<FD>, PLD>>) => {
    const { children, onSubmit, initialize, formValidate, ...rest } = props;
    const form = useFormEngine<FD, PLD, E, any, CD>({ ...params, initialize, formValidate, onSubmit }, rest);

    return (
      <FormContext.Provider value={form}>
        <FormComponent onSubmit={form.handleSubmit} {...rest}>
          {children}
        </FormComponent>
      </FormContext.Provider>
    );
  };
  return Form;
};
