import { FormContextValue } from './types';
export declare type UseForm<E> = <F, P = {}, C = {}>() => FormContextValue<F, E, P, C>;
export declare const createUseForm: <E>() => <F, P = {}, C = {}>() => FormContextValue<F, E, P, C>;
