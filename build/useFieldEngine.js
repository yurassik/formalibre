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
import { ArrayFieldContext } from './array/ArrayFieldContext';
import { ArrayItemContext } from './array/ArrayItemContext';
import { FieldGroupContext } from './group/FieldGroupContext';
export var useFieldEngine = function (path) {
    var _a;
    var form = React.useContext(FormContext);
    var arrayPath = React.useContext(ArrayFieldContext).path;
    var index = React.useContext(ArrayItemContext).index;
    var absolutePath = arrayPath ? arrayPath + "[" + index + "]." + path : path;
    var _b = React.useContext(FieldGroupContext), registerInGroup = _b.registerInGroup, unregisterInGroup = _b.unregisterInGroup;
    var registerField = function (path, init) {
        if (registerInGroup) {
            registerInGroup(path);
        }
        form.registerField(path, init);
    };
    var unregisterField = function (path) {
        if (unregisterInGroup) {
            unregisterInGroup(path);
        }
        form.unregisterField(path);
    };
    return __assign(__assign({ absolutePath: absolutePath, value: (_a = form.formState[absolutePath]) === null || _a === void 0 ? void 0 : _a.value }, form), { registerField: registerField, unregisterField: unregisterField });
};
