import { FC } from 'react';
import { FormMakeConfig } from './types';
import { UseField } from './createUseField';
import { UseForm } from './createUseForm';
import { TForm } from './createForm';
import { WithForm } from './createWithForm';
import { ArrayFieldProps } from './array/ArrayField';
import { FieldGroupProps } from './group/FieldGroup';
export declare class FormaLibre<E = string> {
    withForm: WithForm<E>;
    Form: TForm<E>;
    useForm: UseForm<E>;
    useField: UseField<E>;
    ArrayField: FC<ArrayFieldProps>;
    FieldGroup: FC<FieldGroupProps>;
    constructor(config: FormMakeConfig<E>);
}
