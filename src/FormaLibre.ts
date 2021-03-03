import { FormMakeConfig } from './types';
import { createUseField } from './createUseField';
import { createUseForm } from './createUseForm';
import { createForm } from './createForm';
import { createWithForm } from './createWithForm';
import { ArrayField } from './array/ArrayField';
import { FieldGroup } from './group/FieldGroup';

export class FormaLibre<E = string> {
  withForm: ReturnType<typeof createWithForm>;
  Form: ReturnType<typeof createForm>;
  useForm: ReturnType<typeof createUseForm>;
  useField: ReturnType<typeof createUseField>;

  ArrayField;
  FieldGroup;

  constructor(config: FormMakeConfig<E>) {
    this.withForm = createWithForm<E>(config);
    this.Form = createForm<E>(config);
    this.useForm = createUseForm<E>();
    this.useField = createUseField<E>();
    this.ArrayField = ArrayField;
    this.FieldGroup = FieldGroup;
  }
}
