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
import * as React from 'react';
import { FormContext } from './FormContext';
import { useFormEngine } from './useFormEngine';
export var createWithForm = function (initialParams) { return function (config) { return function (Component) {
    var Wrapper = function (props) {
        var form = useFormEngine(__assign(__assign({}, initialParams), config), props);
        return (React.createElement(FormContext.Provider, { value: form },
            React.createElement(Component, __assign({}, props))));
    };
    return Wrapper;
}; }; };
