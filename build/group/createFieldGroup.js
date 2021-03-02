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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useContext } from 'react';
import { FormContext } from '../FormContext';
export var createFieldGroup = function () {
    var FieldGroup = function (_a) {
        var children = _a.children;
        var _b = __read(React.useState(), 2), fields = _b[0], setFields = _b[1];
        var _c = __read(React.useState(true), 2), isValid = _c[0], setIsValid = _c[1];
        var _d = __read(React.useState(false), 2), isFilled = _d[0], setIsFilled = _d[1];
        var formState = useContext(FormContext).formState;
        React.useEffect(function () {
            var e_1, _a;
            var _b, _c, _d;
            if (fields) {
                var nextIsValid = true;
                var nextIsFilled = true;
                try {
                    for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                        var path = fields_1_1.value;
                        if (!nextIsValid && !nextIsFilled)
                            break;
                        nextIsValid = nextIsValid ? !((_b = formState[path]) === null || _b === void 0 ? void 0 : _b.error) : nextIsValid;
                        nextIsFilled =
                            nextIsFilled && ((_d = (_c = formState[path]) === null || _c === void 0 ? void 0 : _c.constraints) === null || _d === void 0 ? void 0 : _d.required) ? Boolean(formState[path].value) : nextIsFilled;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (fields_1_1 && !fields_1_1.done && (_a = fields_1.return)) _a.call(fields_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                setIsValid(nextIsValid);
                setIsFilled(nextIsFilled);
            }
        }, [formState, fields]);
        var registerInGroup = function (path) {
            setFields(function (prev) {
                if (prev === void 0) { prev = []; }
                return __spreadArray(__spreadArray([], __read(prev)), [path]);
            });
        };
        var unregisterInGroup = function (path) {
            setFields(function (prev) {
                if (prev === void 0) { prev = []; }
                var idx = prev.findIndex(function (value) { return value === path; });
                return __spreadArray(__spreadArray([], __read(prev.slice(0, idx))), __read(prev.slice(idx + 1)));
            });
        };
        return (React.createElement(FieldGroupContext.Provider, { value: { registerInGroup: registerInGroup, unregisterInGroup: unregisterInGroup } }, children({ isValid: isValid, isFilled: isFilled })));
    };
    return FieldGroup;
};
export var FieldGroupContext = React.createContext({});
