import { FC } from 'react';
import { FormMakeConfig } from './types';
import { createUseField, UseField } from './createUseField';
import { createUseForm, UseForm } from './createUseForm';
import { createForm, TForm } from './createForm';
import { createWithForm, WithForm } from './createWithForm';
import { ArrayField, ArrayFieldProps } from './array/ArrayField';
import { FieldGroup, FieldGroupProps } from './group/FieldGroup';

export class FormaLibre<E = string> {
  withForm: WithForm<E>;
  Form: TForm<E>;
  useForm: UseForm<E>;
  useField: UseField<E>;

  ArrayField: FC<ArrayFieldProps>;
  FieldGroup: FC<FieldGroupProps>;

  constructor(config: FormMakeConfig<E>) {
    this.withForm = createWithForm<E>(config);
    this.Form = createForm<E>(config);
    this.useForm = createUseForm<E>();
    this.useField = createUseField<E>();
    this.ArrayField = ArrayField;
    this.FieldGroup = FieldGroup;
  }
}
