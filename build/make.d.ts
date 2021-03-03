/// <reference types="react" />
import { FormMakeConfig } from './types';
export declare const make: <E>(config: FormMakeConfig<E>) => {
    withForm: <FD, PLD = {}, CD = {}, PRPS = {}>(config: import("./types").FormEngineConfig<FD, PLD, CD, PRPS, E>) => (Component: import("react").ComponentType<PRPS>) => import("react").FC<PRPS> & {
        [key: string]: any;
    };
    Form: <FD_1, PLD_1 = any, CD_1 = any>(props: import("react").PropsWithChildren<import("./types").FormProps<Partial<FD_1>, PLD_1, E>>) => JSX.Element;
    useForm: <F, P = {}, C = {}>() => import("./types").FormContextValue<F, E, P, C>;
    useField: (path: string, initData: import("./types").RegisterFieldInitData<E>) => {
        field: {
            onChange: (value: any) => void;
            onBlur: () => void;
            value: any;
            defaultValue: any;
            error: E;
            ref: import("react").RefObject<Partial<HTMLElement> & {
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
    ArrayField: import("react").FC<import("./array/createArrayField").Props>;
    FieldGroup: import("react").FC<import("./group/createFieldGroup").Props>;
};
