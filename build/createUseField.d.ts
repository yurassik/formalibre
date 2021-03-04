import * as React from 'react';
import { FinalValue, FieldData, RegisterFieldInitData } from './types';
export declare type UseField<E> = (path: string, initData: RegisterFieldInitData<E>) => {
    field: FieldData<E> & {
        onChange: (value: FinalValue) => void;
        onBlur: VoidFunction;
    };
    form: {
        disabled: boolean;
        progress: boolean;
        initializing: boolean;
    };
};
export declare const createUseField: <E>() => (path: string, initData: RegisterFieldInitData<E>) => {
    field: {
        onChange: (value: FinalValue) => void;
        onBlur: () => void;
        value: any;
        defaultValue: any;
        error: E;
        ref: React.RefObject<Partial<HTMLElement> & {
            [key: string]: any;
        }>;
        validate: import("./types").Validate<E>;
        customValidate: import("./types").CustomValidate<E>;
        constraints: import("./types").Constraints;
        isRegistered?: boolean;
    };
    form: {
        disabled: boolean;
        progress: boolean;
        initializing: boolean;
    };
};
