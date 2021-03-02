import { FormContextValue } from './types';
export declare const createUseForm: <E>() => <F, P = {}, C = {}>() => FormContextValue<F, E, P, C>;
