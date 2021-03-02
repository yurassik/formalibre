var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { FormContext } from './FormContext';
import { useFormEngine } from './useFormEngine';
export var createForm = function (params) { return function (FormComponent) {
    var Form = function (props) {
        var children = props.children, onSubmit = props.onSubmit, initialize = props.initialize, formValidate = props.formValidate, rest = __rest(props, ["children", "onSubmit", "initialize", "formValidate"]);
        var form = useFormEngine(__assign(__assign({}, params), { initialize: initialize, formValidate: formValidate, onSubmit: onSubmit }), rest);
        return (React.createElement(FormContext.Provider, { value: form },
            React.createElement(FormComponent, __assign({ onSubmit: form.handleSubmit }, rest), children)));
    };
    return Form;
}; };
