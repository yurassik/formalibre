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
import { useEffect, useState } from 'react';
export function toArrayPath(name) {
    var path = [];
    var sub = '';
    for (var i = 0; i < name.length; i += 1) {
        var char = name[i];
        if (['.', '[', ']'].includes(char)) {
            if (sub.length) {
                path.push(sub);
                sub = '';
            }
            continue;
        }
        else {
            sub += char;
        }
    }
    if (sub) {
        path.push(sub);
    }
    return path;
}
var isNumber = function (entry) { return !Number.isNaN(Number(entry)); };
function set(substate, subpath, value) {
    var _a = __read(subpath), current = _a[0], next = _a[1], tail = _a.slice(2);
    if (!next) {
        substate[current] = value;
        return;
    }
    if (!substate[current]) {
        substate[current] = isNumber(next) ? [] : {};
    }
    set(substate[current], __spreadArray([next], __read(tail)), value);
}
export function fromFlat(flat) {
    var state = {};
    Object.entries(flat).forEach(function (_a) {
        var _b = __read(_a, 2), path = _b[0], value = _b[1];
        set(state, toArrayPath(path), value);
    });
    return state;
}
export function setByPath(path, value, targetObj) {
    set(targetObj, toArrayPath(path), value);
}
export function getByPath(path, fromObj) {
    var result;
    try {
        eval("result = fromObj." + path);
    }
    catch (_a) {
        return undefined;
    }
    return result;
}
export function removeByPath(path, fromObj) {
    try {
        eval("delete fromObj." + path);
    }
    catch (_a) {
    }
}
export function makeId(length) {
    if (length === void 0) { length = 5; }
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
export function normalizeStringValue(value) {
    return value.trim().replace(/\s{2,}/, ' ');
}
export var useFirstRender = function () {
    var _a = __read(useState(true), 2), isFirstRender = _a[0], setIsFirstRender = _a[1];
    useEffect(function () {
        setIsFirstRender(false);
    }, []);
    return isFirstRender;
};
