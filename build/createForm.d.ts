import * as React from 'react';
import { FormMakeConfig, FormProps, FormComponentProps } from './types';
export declare const createForm: <E>(params: FormMakeConfig<E>) => (FormComponent: React.ComponentType<FormComponentProps>) => <FD, PLD = any, CD = any>(props: React.PropsWithChildren<FormProps<Partial<FD>, PLD>>) => JSX.Element;
