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
import { ArrayFieldContext } from './ArrayFieldContext';
import { ArrayItemContext } from './ArrayItemContext';
import { ArrayFieldItem } from './ArrayFieldItem';
import { FormContext } from '../FormContext';
import { makeId, getByPath } from '../utils';
export var createArrayField = function () {
    var ArrayField = function (props) {
        var relativePath = props.name, renderItem = props.renderItem, renderContainer = props.renderContainer, pushItems = props.pushItems;
        var _a = __read(React.useState([]), 2), entries = _a[0], setEntries = _a[1];
        var form = React.useContext(FormContext);
        var array = React.useContext(ArrayFieldContext);
        var item = React.useContext(ArrayItemContext);
        var createKey = function () { return "form-" + form.formId + "-" + relativePath + "-" + makeId(); };
        var path = array.path ? array.path + "[" + item.index + "]." + relativePath : relativePath;
        React.useEffect(function () {
            if (!form.initializing) {
                var initData = getByPath(path, form.formData);
                form.registerArrayField(path);
                if (initData) {
                    setEntries(initData.map(function () { return createKey(); }));
                }
            }
        }, [form.initializing]);
        React.useEffect(function () {
            if (pushItems) {
                var entries_1 = [];
                for (var i = 0; i < pushItems; i += 1) {
                    entries_1.push(createKey());
                }
                setEntries(function (state) {
                    return __spreadArray(__spreadArray([], __read(state)), __read(entries_1));
                });
            }
        }, []);
        var createRemove = function (index) { return function () {
            form.removeArrayItem(path, index);
            setEntries(function (prevState) { return __spreadArray(__spreadArray([], __read(prevState.slice(0, index))), __read(prevState.slice(index + 1))); });
        }; };
        var push = function () {
            return setEntries(function (state) {
                return __spreadArray(__spreadArray([], __read(state)), [createKey()]);
            });
        };
        var items = entries.map(function (key, index) {
            var initializing = !(form.formData[path] && form.formData[path][index]);
            return (React.createElement(ArrayFieldItem, { key: key, index: index }, renderItem({
                index: index,
                remove: createRemove(index),
                item: {
                    initializing: initializing,
                    data: !initializing ? form.formData[path][index] : undefined,
                },
            })));
        });
        return (React.createElement(ArrayFieldContext.Provider, { value: { path: path, name: relativePath } }, renderContainer({ items: items, push: push })));
    };
    return ArrayField;
};
