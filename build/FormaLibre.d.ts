import { FormMakeConfig } from './types';
import { createUseField } from './createUseField';
import { createUseForm } from './createUseForm';
import { createForm } from './createForm';
import { createWithForm } from './createWithForm';
export declare class FormaLibre<E = string> {
    withForm: ReturnType<typeof createWithForm>;
    Form: ReturnType<typeof createForm>;
    useForm: ReturnType<typeof createUseForm>;
    useField: ReturnType<typeof createUseField>;
    ArrayField: any;
    FieldGroup: any;
    constructor(config: FormMakeConfig<E>);
}
