import * as React from 'react';
import { ArrayItemContext } from './ArrayItemContext';
export var ArrayFieldItem = function (props) {
    var index = props.index, children = props.children;
    return React.createElement(ArrayItemContext.Provider, { value: { index: index } }, children);
};
