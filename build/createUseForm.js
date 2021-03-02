import * as React from 'react';
import { FormContext } from './FormContext';
export var createUseForm = function () { return function () {
    return React.useContext(FormContext);
}; };
