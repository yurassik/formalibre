import * as React from 'react';

import { FormMakeConfig, FormEngineConfig } from './types';
import { FormContext } from './FormContext';
import { useFormEngine } from './useFormEngine';

export const createWithForm = <ERR, >(initialParams: FormMakeConfig<ERR>) => <FD, PLD = {}, CD = {}, PRPS = {}>(
  config: FormEngineConfig<FD, PLD, CD, PRPS>,
) => (Component: React.ComponentType<PRPS>): React.FC<PRPS> & { [key: string]: any } => {
  const Wrapper: React.FC<PRPS> = (props) => {
    const form = useFormEngine<FD, PLD, ERR, PRPS, CD>({ ...initialParams, ...config }, props);
    return (
      <FormContext.Provider value={form}>
        <Component {...props} />
      </FormContext.Provider>
    );
  };

  return Wrapper;
};
