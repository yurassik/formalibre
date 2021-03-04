import * as React from 'react';
import { FormMakeConfig, FormEngineConfig } from './types';
export declare type WithForm<E> = <FD, PLD = {}, CD = {}, PRPS = {}>(config: FormEngineConfig<FD, PLD, CD, PRPS, E>) => (Component: React.ComponentType<PRPS>) => React.FC<PRPS> & {
    [key: string]: any;
};
export declare const createWithForm: <ERR>(initialParams: FormMakeConfig<ERR>) => <FD, PLD = {}, CD = {}, PRPS = {}>(config: FormEngineConfig<FD, PLD, CD, PRPS, ERR>) => (Component: React.ComponentType<PRPS>) => React.FC<PRPS> & {
    [key: string]: any;
};
