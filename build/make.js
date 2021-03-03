import { createUseField } from './createUseField';
import { createUseForm } from './createUseForm';
import { createForm } from './createForm';
import { createWithForm } from './createWithForm';
import { createArrayField } from './array/createArrayField';
import { createFieldGroup } from './group/createFieldGroup';
export var make = function (config) {
    return {
        withForm: createWithForm(config),
        Form: createForm(config),
        useForm: createUseForm(),
        useField: createUseField(),
        ArrayField: createArrayField(),
        FieldGroup: createFieldGroup(),
    };
};
