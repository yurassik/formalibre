/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

export type FinalValue = any;
export type Constraints = {
  required?: boolean;
  [key: string]: any;
};

export interface FieldData<E> {
  value: FinalValue;
  defaultValue: FinalValue;
  error: E;
  ref: React.RefObject<Partial<HTMLElement> & { [key: string]: any }>;
  validate: Validate<E>;
  customValidate: CustomValidate<E>;
  constraints: Constraints;
  isRegistered?: boolean; // deprecated???
}

export interface RegisterFieldInitData<E> {
  defaultValue: FinalValue;
  constraints: Constraints;
  validate: Validate<E>;
  customValidate: CustomValidate<E>;
  ref: React.RefObject<Partial<HTMLElement> & { [key: string]: any }>;
  autoFocus?: boolean;
}

export interface FormMakeConfig<E> {
  handleError?: HandleErrorFn<E>;
  formComponent: React.ComponentType<FormComponentProps>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface FormEngineConfig<FD, PLD, CD, PRPS, ERR> {
  initialize?: InitializeFormFn<Partial<FD>, PLD, CD, ERR>;
  formValidate?: FormValidateFn<Partial<FD>, PLD>;
  useConnect?: (props: PRPS) => CD;
  onSubmit: OnSubmitFn<Partial<FD>, PLD, CD>;
  dependencies?: (connectedData: CD) => any[];
  handleError?: HandleErrorFn<ERR>;
}

type ErrorHandlerEffects<E> = { setFormError: SetFormErrorFn<E>; setErrors: SetErrorsFn<E>; resetErrors: ResetErrorsFn };

type FormThings<F, P, C> = {
  formData: F;
  payload: P;
  connectedData: C;

};
type FormEffects<F, P> = {
  setPayload: SetPayloadFn<P>;
  setFormData: SetFormDataFn<F>;
  disableForm: () => void;
  clear: () => void;
};

export type HandleErrorFn<E = string> = (e: Error, effects: ErrorHandlerEffects<E>) => void;
export type HandleErrorMiddlewareFn<E> = (e: Error, effects: ErrorHandlerEffects<E>, handleError: HandleErrorFn<E>) => void;

export type OnSubmitFn<F, P = any, C = any> = (
  essentials: FormEffects<F, P> & FormThings<F, P, C>
) => Promise<any> | any;

export type FormValidateFn<FD, PLD> = (formData: FD, payload: PLD) => Promise<Error>;

export type InitializeFormFn<F, P = any, C = any, E = string> = (
  essentials: FormEffects<F, P> & FormThings<F, P, C> & ErrorHandlerEffects<E>
) => void | Promise<void>;

export type Validate<E> = (value: FinalValue, constraints: Constraints) => E | null;

export type CustomValidate<E> = (value: FinalValue, constraints: Constraints, formData: FormFinalData) => E | null;

export type DataStructure<T> = { [key: string]: DataStructure<T> | DataStructure<T>[] | T };

export type FlatStructure<T> = { [key: string]: T };

export type FormState<E> = FlatStructure<FieldData<E>>;

export type FormFinalData = DataStructure<FinalValue>;

export type FormPayload = { [key: string]: any };

export type SetDataFn<T> = (formData: Partial<T>) => void;

export type RegisterFieldFn<E> = (path: string, initData: RegisterFieldInitData<E>) => void;

export type HandleSubmitFn = (e?: React.FormEvent) => Promise<any> | any;

type SubmitMiddlewareFn = (mixin?: { [key: string]: any }) => Promise<any> | any;

export type SubmitHandlerFn = (middleware: (submit: SubmitMiddlewareFn) => Promise<void> | void) => HandleSubmitFn;

export type SetFormErrorFn<E> = React.Dispatch<React.SetStateAction<E>>;

export type SetErrorsFn<E> = (errors: Errors<E> | null) => void;

export type ResetErrorsFn = () => void;

type SetPayloadFn<P> = (payload: Partial<P>) => void;

type SetFormDataFn<F> = React.Dispatch<React.SetStateAction<F>>;

export type Errors<E> = { [path: string]: E };

export type FormProps<FD, PLD, ERR> = {
  onSubmit: OnSubmitFn<FD, PLD>;
} & Pick<FormEngineConfig<FD, PLD, any, {}, ERR>, 'formValidate' | 'initialize'>;

export type FormComponentProps = { onSubmit?: HandleSubmitFn };

export interface FormContextValue<FD, E, PLD = {}, CD = {}> {
  formId: string;
  formState: FormState<E>;
  formData: Partial<FD>;
  formError?: E;
  payload: PLD;
  connectedData: CD;

  setValue: (path: keyof FD | string, value: any) => void;
  setConstraints: (path: string, constraints: Constraints) => void;
  setError: (path: string, error: E) => void;
  setFormError?: React.Dispatch<React.SetStateAction<E>>;
  setPayload: SetPayloadFn<PLD>;
  setMountedFields: React.Dispatch<React.SetStateAction<number>>;

  registerField: RegisterFieldFn<E>;
  updateField: (path: string, config: Pick<RegisterFieldInitData<E>, 'constraints'>) => void;
  unregisterField: (path: string) => void;
  registerArrayField: (path: string) => void;
  removeArrayItem: (path: string, index: number) => void;
  handleSubmit: HandleSubmitFn;
  submitHandler: SubmitHandlerFn;
  validateField: (path: string, value?: any) => E | null;
  reinit: () => void;
  clear: () => void;

  disabled?: boolean;
  progress?: boolean;
  initializing?: boolean;
  isRequiredFieldEmpty?: boolean;
  ready: boolean;
}

export type ArrayFieldRenderItemFn = (arg: {
  index: number;
  remove: VoidFunction;
  item: {
    initializing: boolean;
    data: { [key: string]: any };
  };
}) => React.ReactNode;
export type ArrayFieldRenderContainerFn = (arg: { items: JSX.Element[]; push: VoidFunction }) => React.ReactNode;

export interface ArrayFieldContextValue {
  name?: string;
  path?: string;
}

export interface ArrayItemContextValue {
  index?: number;
}

export interface FieldGroupContextValue {
  registerInGroup?: (path: string) => void;
  unregisterInGroup?: (path: string) => void;
};
