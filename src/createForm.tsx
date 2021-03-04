import * as React from "react";

import { FormMakeConfig, FormProps } from "./types";
import { FormContext } from "./FormContext";
import { useFormEngine } from "./useFormEngine";

export type TForm<E> = <FD, PLD = any, CD = any>(props: React.PropsWithChildren<FormProps<Partial<FD>, PLD, E>>) => JSX.Element;

export const createForm = <E,>({ formComponent: FormComponent, ...params }: FormMakeConfig<E>) => {
  const Form = <FD, PLD = any, CD = any>(
    props: React.PropsWithChildren<FormProps<Partial<FD>, PLD, E>>
  ) => {
    const { children, onSubmit, initialize, formValidate, ...rest } = props;
    const form = useFormEngine<FD, PLD, any, CD, E>({ ...params, initialize, formValidate, onSubmit }, rest);

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
