import React from 'react';
export interface Props {
    children: (props: {
        isValid: boolean;
        isFilled: boolean;
    }) => React.ReactNode;
}
export declare const createFieldGroup: () => React.FC<Props>;
declare type FieldGroupContextValue = {
    registerInGroup?: (path: string) => void;
    unregisterInGroup?: (path: string) => void;
};
export declare const FieldGroupContext: React.Context<FieldGroupContextValue>;
export {};
