import * as React from 'react';
import { FormMakeConfig, FormComponentProps } from './types';
export declare const make: <E>(config: FormMakeConfig<E>, FormComponent: React.ComponentType<FormComponentProps>) => {
    withForm: <FD, PLD = {}, CD = {}, PRPS = {}>(config: import("./types").FormEngineConfig<FD, PLD, CD, PRPS>) => (Component: React.ComponentType<PRPS>) => React.FC<PRPS> & {
        [key: string]: any;
    };
    Form: <FD_1, PLD_1 = any, CD_1 = any>(props: React.PropsWithChildren<import("./types").FormProps<Partial<FD_1>, PLD_1>>) => JSX.Element;
    useForm: <F, P = {}, C = {}>() => import("./types").FormContextValue<F, E, P, C>;
    useField: (path: string, initData: import("./types").RegisterFieldInitData<E>) => {
        field: {
            onChange: (value: any) => void;
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
    ArrayField: React.FC<import("./array/createArrayField").Props>;
    FieldGroup: React.FC<import("./group/createFieldGroup").Props>;
};
