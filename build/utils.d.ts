import { FormFinalData, FinalValue, FlatStructure } from './types';
export declare function toArrayPath(name: string): string[];
export declare function fromFlat(flat: FlatStructure<FinalValue>): FormFinalData;
export declare function setByPath(path: string, value: FinalValue, targetObj: object): void;
export declare function getByPath(path: string, fromObj: object): any;
export declare function removeByPath(path: string, fromObj: object): void;
export declare function makeId(length?: number): string;
export declare function normalizeStringValue(value: string): string;
export declare const useFirstRender: () => boolean;
