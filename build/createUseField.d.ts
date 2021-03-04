import * as React from 'react';
import { FinalValue, RegisterFieldInitData } from './types';
export declare type UseField<E> = ReturnType<typeof createUseField>;
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
