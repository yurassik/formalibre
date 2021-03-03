import { createUseField } from './createUseField';
import { createUseForm } from './createUseForm';
import { createForm } from './createForm';
import { createWithForm } from './createWithForm';
import { ArrayField } from './array/ArrayField';
import { FieldGroup } from './group/FieldGroup';
var FormaLibre = (function () {
    function FormaLibre(config) {
        this.withForm = createWithForm(config);
        this.Form = createForm(config);
        this.useForm = createUseForm();
        this.useField = createUseField();
        this.ArrayField = ArrayField;
        this.FieldGroup = FieldGroup;
    }
    return FormaLibre;
}());
export { FormaLibre };
