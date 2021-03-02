import * as React from 'react';
import { FormMakeConfig, FormComponentProps } from './types';
import { createUseField } from './createUseField';
import { createUseForm } from './createUseForm';
import { createForm } from './createForm';
import { createWithForm } from './createWithForm';
import { createArrayField } from './array/createArrayField';
import { createFieldGroup } from './group/createFieldGroup';

export const make = <E, >(config: FormMakeConfig<E>, FormComponent: React.ComponentType<FormComponentProps>) => {
  return {
    withForm: createWithForm<E>(config),
    Form: createForm<E>(config)(FormComponent),
    useForm: createUseForm<E>(),
    useField: createUseField<E>(),
    ArrayField: createArrayField(),
    FieldGroup: createFieldGroup(),
  };
};
