import React from 'react';
export interface FieldGroupProps {
    children: (props: {
        isValid: boolean;
        isFilled: boolean;
    }) => React.ReactNode;
}
export declare const FieldGroup: React.FC<FieldGroupProps>;
