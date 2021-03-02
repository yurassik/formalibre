import * as React from 'react';

import { FinalValue, FieldData, RegisterFieldInitData } from './types';
import { useFieldEngine } from './useFieldEngine';
import { normalizeStringValue, useFirstRender } from './utils';

export const createUseField = <E>() => (path: string, initData: RegisterFieldInitData<E>) => {
  const firstRender = useFirstRender();
  const {
    setValue,
    formState,
    disabled,
    progress,
    initializing,
    setError,
    validateField,
    registerField,
    unregisterField,
    updateField,
    absolutePath,
    value,
    setMountedFields,
  } = useFieldEngine<E>(path);

  React.useEffect(() => {
    if (!initializing) {
      registerField(absolutePath, initData);
    }
  }, [initializing]);

  React.useEffect(() => {
    setMountedFields((prevValue = 0) => prevValue + 1);
    return () => unregisterField(absolutePath);
  }, []);

  React.useEffect(() => {
    if (!firstRender) {
      updateField(absolutePath, { constraints: initData.constraints });
    }
  }, [...Object.values(initData.constraints)]);

  const fieldData = formState[absolutePath] || ({} as FieldData<E>);

  const field = {
    ...fieldData,
    onChange: (value: FinalValue) => setValue(absolutePath, value),
    onBlur: () => {
      let normalizedValue = value;
      if (typeof value === 'string') {
        normalizedValue = normalizeStringValue(value);
      }
      setValue(absolutePath, normalizedValue);
      setError(absolutePath, validateField(absolutePath, normalizedValue));
    },
  };

  return { field, form: { disabled, progress, initializing } };
};
