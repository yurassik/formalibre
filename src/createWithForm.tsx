import * as React from 'react';

import { FormMakeConfig, FormEngineConfig } from './types';
import { FormContext } from './FormContext';
import { useFormEngine } from './useFormEngine';

export type WithForm<E> = <FD, PLD = {}, CD = {}, PRPS = {}>(
  config: FormEngineConfig<FD, PLD, CD, PRPS, E>
) => (
  Component: React.ComponentType<PRPS>
) => React.FC<PRPS> & { [key: string]: any };

export const createWithForm = <ERR, >(initialParams: FormMakeConfig<ERR>) => {
  const withForm = <FD, PLD = {}, CD = {}, PRPS = {}>(config: FormEngineConfig<FD, PLD, CD, PRPS, ERR>) => {
    return (Component: React.ComponentType<PRPS>) => {
      return (props: PRPS & { [key: string]: any }) => {
        const form = useFormEngine<FD, PLD, PRPS, CD, ERR>(
          { ...initialParams, ...config },
          props
        );
        return (
          <FormContext.Provider value={form}>
            <Component {...props} />
          </FormContext.Provider>
        );
      };
    }
  }

  return withForm;
};
