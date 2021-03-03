import React from 'react';
export interface Props {
    children: (props: {
        isValid: boolean;
        isFilled: boolean;
    }) => React.ReactNode;
}
export declare const FieldGroup: React.FC<Props>;
