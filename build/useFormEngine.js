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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
import { useMemo, useState, useEffect } from 'react';
import { makeId, setByPath, getByPath, removeByPath, normalizeStringValue } from './utils';
export var useFormEngine = function (config, props) {
    var formId = useMemo(function () { return makeId(); }, []);
    var _a = __read(useState(true), 2), isFirstInit = _a[0], setIsFirstInit = _a[1];
    var _b = __read(useState(false), 2), disabled = _b[0], setDisabled = _b[1];
    var _c = __read(useState(null), 2), formError = _c[0], setFormError = _c[1];
    var _d = __read(useState(false), 2), progress = _d[0], setProgress = _d[1];
    var _e = __read(useState(true), 2), initializing = _e[0], setInitializing = _e[1];
    var _f = __read(useState(false), 2), ready = _f[0], setReady = _f[1];
    var _g = __read(useState(), 2), registeredFields = _g[0], setRegisteredFields = _g[1];
    var _h = __read(useState(), 2), mountedFields = _h[0], setMountedFields = _h[1];
    var _j = __read(useState({}), 2), payload = _j[0], setPayloadState = _j[1];
    var _k = __read(useState({}), 2), formState = _k[0], setFormState = _k[1];
    var _l = __read(useState({}), 2), formData = _l[0], setFormData = _l[1];
    var connectedData = config.useConnect && config.useConnect(props);
    var disableForm = function () { return setDisabled(true); };
    var setPayload = function (payload) {
        setPayloadState(function (prevState) { return (__assign(__assign({}, prevState), payload)); });
    };
    var clear = function () {
        setFormState({});
        setFormData({});
    };
    var isRequiredFieldEmpty = Object.values(formState).some(function (field) { var _a; return ((_a = field === null || field === void 0 ? void 0 : field.constraints) === null || _a === void 0 ? void 0 : _a.required) && !field.value; });
    var _m = config.initialize, initialize = _m === void 0 ? function () { } : _m, _o = config.handleError, handleError = _o === void 0 ? function () { } : _o;
    var onMount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!initializing) return [3, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4, initialize({ setFormData: setFormData, setPayload: setPayload, disableForm: disableForm, clear: clear, connectedData: connectedData, payload: payload, formData: formData })];
                case 2:
                    _a.sent();
                    return [3, 5];
                case 3:
                    error_1 = _a.sent();
                    handleError(error_1, { setErrors: setErrors, setFormError: setFormError, resetErrors: resetErrors });
                    if (process.env.NODE_ENV === 'development') {
                        console.error(error_1);
                    }
                    return [3, 5];
                case 4:
                    setInitializing(false);
                    setIsFirstInit(false);
                    return [7];
                case 5: return [2];
            }
        });
    }); };
    useEffect(function () {
        if (mountedFields === undefined || registeredFields === undefined) {
            return;
        }
        if (registeredFields === mountedFields) {
            setReady(true);
        }
    }, [registeredFields]);
    useEffect(function () {
        onMount();
    }, [initializing]);
    useEffect(function () {
        if (isFirstInit) {
            return;
        }
        reinit();
    }, config.dependencies ? config.dependencies(connectedData) : []);
    var reinit = function () {
        setDisabled(false);
        setFormError(null);
        setPayloadState({});
        setFormData({});
        setFormState({});
        setInitializing(true);
    };
    var setConstraints = function (path, constraints) {
        setFormState(function (prevState) {
            var nextState = __assign({}, prevState);
            nextState[path].constraints = constraints;
            return nextState;
        });
    };
    var setValue = function (path, value) {
        setFormData(function (prevState) {
            setByPath(path, value, prevState);
            return __assign({}, prevState);
        });
        setFormState(function (prevState) {
            var nextState = __assign({}, prevState);
            var prevFieldData = prevState[path];
            nextState[path] = __assign(__assign({}, prevFieldData), { value: value, error: null });
            return nextState;
        });
    };
    var setError = function (path, error) {
        setFormState(function (prevState) {
            if (!error)
                return prevState;
            var nextState = __assign({}, prevState);
            var prevFieldData = prevState[path];
            nextState[path] = __assign(__assign({}, prevFieldData), { error: error });
            return nextState;
        });
    };
    var registerField = function (path, field) {
        var defaultValue = field.defaultValue, constraints = field.constraints, validate = field.validate, customValidate = field.customValidate, ref = field.ref, autoFocus = field.autoFocus;
        if (autoFocus) {
            ref.current.focus();
        }
        var initValue = getByPath(path, formData);
        var value = initValue || (defaultValue !== null && defaultValue !== void 0 ? defaultValue : null);
        setFormState(function (prevState) {
            var nextState = __assign({}, prevState);
            nextState[path] = {
                value: value,
                defaultValue: defaultValue,
                constraints: constraints,
                validate: validate,
                customValidate: customValidate,
                ref: ref,
                isRegistered: true,
                error: null,
            };
            return nextState;
        });
        setFormData(function (state) {
            setByPath(path, value, state);
            return __assign({}, state);
        });
        setRegisteredFields(function (prevValue) {
            if (prevValue === void 0) { prevValue = 0; }
            return prevValue + 1;
        });
    };
    var updateField = function (path, _a) {
        var constraints = _a.constraints;
        setFormState(function (prevState) {
            var nextState = __assign({}, prevState);
            nextState[path] = __assign(__assign({}, nextState[path]), { constraints: constraints });
            return nextState;
        });
    };
    var unregisterField = function (path) {
        setFormState(function (prevState) {
            var nextState = __assign({}, prevState);
            delete nextState[path];
            return nextState;
        });
        setFormData(function (state) {
            removeByPath(path, state);
            return __assign({}, state);
        });
    };
    var registerArrayField = function (path) {
        setFormData(function (state) {
            var initValue = getByPath(path, state);
            var value = initValue || [];
            setByPath(path, value, state);
            return __assign({}, state);
        });
    };
    var removeArrayItem = function (arrayPath, index) {
        var newFormData = __assign({}, formData);
        var array = getByPath(arrayPath, newFormData);
        var isLast = array.length - 1 === index;
        setByPath(arrayPath, __spreadArray(__spreadArray([], __read(array.slice(0, index))), __read(array.slice(index + 1))), newFormData);
        setFormData(newFormData);
        setFormState(function (state) {
            return Object.entries(state).reduce(function (acc, _a) {
                var _b, _c, _d;
                var _e = __read(_a, 2), path = _e[0], value = _e[1];
                if (path.startsWith(arrayPath)) {
                    var escapedArrayPath = arrayPath.replace(/\[|\]/g, '\\$&');
                    var reg = new RegExp("^(" + escapedArrayPath + ")\\[(.+)\\](\\..*)");
                    var _f = __read(reg.exec(path), 3), currentIndex = _f[2];
                    if (isLast && Number(currentIndex) === index) {
                        return acc;
                    }
                    if (Number(currentIndex) > index) {
                        var newPath = path.replace(reg, "$1[" + (+currentIndex - 1) + "]$3");
                        return __assign(__assign({}, acc), (_b = {}, _b[newPath] = value, _b));
                    }
                    return __assign(__assign({}, acc), (_c = {}, _c[path] = value, _c));
                }
                return __assign(__assign({}, acc), (_d = {}, _d[path] = value, _d));
            }, {});
        });
    };
    var setErrors = function (errors) {
        setFormState(function (prevState) {
            if (!errors)
                return prevState;
            var nextState = __assign({}, prevState);
            Object.entries(errors).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], error = _b[1];
                nextState[key] = __assign(__assign({}, nextState[key]), { error: error });
            });
            return nextState;
        });
    };
    var resetErrors = function () {
        setFormState(function (prevState) {
            var nextState = Object.entries(prevState).reduce(function (acc, _a) {
                var _b = __read(_a, 2), path = _b[0], fieldData = _b[1];
                acc[path] = __assign(__assign({}, fieldData), { error: null });
                return acc;
            }, {});
            return nextState;
        });
    };
    function validateFormState() {
        return Object.keys(formState).reduce(function (errors, path) {
            var _a;
            var error = validateField(path);
            if (error) {
                return __assign(__assign({}, (errors || {})), (_a = {}, _a[path] = error, _a));
            }
            return errors;
        }, null);
    }
    function validateField(path, customValue) {
        var _a = formState[path], fieldValue = _a.value, _b = _a.validate, validate = _b === void 0 ? null : _b, _c = _a.customValidate, customValidate = _c === void 0 ? null : _c, constraints = _a.constraints;
        var value = customValue || fieldValue;
        var error = validate && validate(value, constraints);
        if (!error) {
            error = customValidate && customValidate(value, constraints, formData);
        }
        return error;
    }
    var submitHandler = function (middleware) { return function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var errors, normalizedFormData_1, rawError, submit, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (e) {
                        e.preventDefault();
                    }
                    resetErrors();
                    setFormError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, 6, 7]);
                    errors = validateFormState();
                    if (errors) {
                        setErrors(errors);
                        return [2];
                    }
                    normalizedFormData_1 = Object.entries(formData).reduce(function (acc, _a) {
                        var _b, _c;
                        var _d = __read(_a, 2), key = _d[0], value = _d[1];
                        if (typeof value === 'string') {
                            return __assign(__assign({}, acc), (_b = {}, _b[key] = normalizeStringValue(value), _b));
                        }
                        return __assign(__assign({}, acc), (_c = {}, _c[key] = value, _c));
                    }, {});
                    if (!config.formValidate) return [3, 3];
                    return [4, config.formValidate(normalizedFormData_1, payload)];
                case 2:
                    rawError = _a.sent();
                    if (rawError) {
                        throw rawError;
                    }
                    _a.label = 3;
                case 3:
                    setProgress(true);
                    submit = function (mixin) {
                        if (mixin === void 0) { mixin = {}; }
                        return config.onSubmit({
                            formData: __assign(__assign({}, normalizedFormData_1), mixin),
                            payload: payload,
                            connectedData: connectedData,
                            clear: clear,
                            disableForm: disableForm,
                            setFormData: setFormData,
                            setPayload: setPayload
                        });
                    };
                    return [4, middleware(submit)];
                case 4:
                    _a.sent();
                    return [3, 7];
                case 5:
                    error_2 = _a.sent();
                    if (process.env.NODE_ENV === 'development') {
                        console.error(error_2);
                    }
                    handleError(error_2, { setErrors: setErrors, setFormError: setFormError, resetErrors: resetErrors });
                    throw error_2;
                case 6:
                    setProgress(false);
                    return [7];
                case 7: return [2];
            }
        });
    }); }; };
    var handleSubmit = submitHandler(function (submit) { return submit(); });
    return {
        formId: formId,
        formState: formState,
        formData: formData,
        formError: formError,
        payload: payload,
        connectedData: connectedData,
        setValue: setValue,
        setConstraints: setConstraints,
        setError: setError,
        setFormError: setFormError,
        setPayload: setPayload,
        setMountedFields: setMountedFields,
        handleSubmit: handleSubmit,
        submitHandler: submitHandler,
        registerField: registerField,
        updateField: updateField,
        unregisterField: unregisterField,
        registerArrayField: registerArrayField,
        removeArrayItem: removeArrayItem,
        validateField: validateField,
        reinit: reinit,
        clear: clear,
        ready: ready,
        disabled: disabled,
        progress: progress,
        initializing: initializing,
        isRequiredFieldEmpty: isRequiredFieldEmpty,
    };
};
