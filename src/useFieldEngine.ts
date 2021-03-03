import * as React from 'react';

import { FormContextValue, RegisterFieldInitData } from './types';
import { FormContext } from './FormContext';
import { ArrayFieldContext } from './array/ArrayFieldContext';
import { ArrayItemContext } from './array/ArrayItemContext';
import { FieldGroupContext } from './group/FieldGroupContext';

export const useFieldEngine = <E>(path: string) => {
  const form = React.useContext<FormContextValue<any, E>>(FormContext);
  const { path: arrayPath } = React.useContext(ArrayFieldContext);
  const { index } = React.useContext(ArrayItemContext);

  const absolutePath = arrayPath ? `${arrayPath}[${index}].${path}` : path;

  const { registerInGroup, unregisterInGroup } = React.useContext(FieldGroupContext);

  const registerField = (path: string, init: RegisterFieldInitData<E>) => {
    if (registerInGroup) {
      registerInGroup(path);
    }
    form.registerField(path, init);
  };

  const unregisterField = (path: string) => {
    if (unregisterInGroup) {
      unregisterInGroup(path);
    }
    form.unregisterField(path);
  };

  return { absolutePath, value: form.formState[absolutePath]?.value, ...form, registerField, unregisterField };
};
