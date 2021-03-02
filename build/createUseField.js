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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import * as React from 'react';
import { useFieldEngine } from './useFieldEngine';
import { normalizeStringValue, useFirstRender } from './utils';
export var createUseField = function () { return function (path, initData) {
    var firstRender = useFirstRender();
    var _a = useFieldEngine(path), setValue = _a.setValue, formState = _a.formState, disabled = _a.disabled, progress = _a.progress, initializing = _a.initializing, setError = _a.setError, validateField = _a.validateField, registerField = _a.registerField, unregisterField = _a.unregisterField, updateField = _a.updateField, absolutePath = _a.absolutePath, value = _a.value, setMountedFields = _a.setMountedFields;
    React.useEffect(function () {
        if (!initializing) {
            registerField(absolutePath, initData);
        }
    }, [initializing]);
    React.useEffect(function () {
        setMountedFields(function (prevValue) {
            if (prevValue === void 0) { prevValue = 0; }
            return prevValue + 1;
        });
        return function () { return unregisterField(absolutePath); };
    }, []);
    React.useEffect(function () {
        if (!firstRender) {
            updateField(absolutePath, { constraints: initData.constraints });
        }
    }, __spreadArray([], __read(Object.values(initData.constraints))));
    var fieldData = formState[absolutePath] || {};
    var field = __assign(__assign({}, fieldData), { onChange: function (value) { return setValue(absolutePath, value); }, onBlur: function () {
            var normalizedValue = value;
            if (typeof value === 'string') {
                normalizedValue = normalizeStringValue(value);
            }
            setValue(absolutePath, normalizedValue);
            setError(absolutePath, validateField(absolutePath, normalizedValue));
        } });
    return { field: field, form: { disabled: disabled, progress: progress, initializing: initializing } };
}; };
