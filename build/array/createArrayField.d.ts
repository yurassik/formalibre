import * as React from 'react';
import { ArrayFieldRenderItemFn, ArrayFieldRenderContainerFn } from '../types';
export interface Props {
    name: string;
    renderItem: ArrayFieldRenderItemFn;
    renderContainer: ArrayFieldRenderContainerFn;
    pushItems?: number;
}
export declare const createArrayField: () => React.FC<Props>;
