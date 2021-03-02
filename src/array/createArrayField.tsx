import * as React from 'react';

import { ArrayFieldContext } from './ArrayFieldContext';
import { ArrayItemContext } from './ArrayItemContext';
import { ArrayFieldItem } from './ArrayFieldItem';
import { FormContext } from '../FormContext';
import { ArrayFieldRenderItemFn, ArrayFieldRenderContainerFn } from '../types';
import { makeId, getByPath } from '../utils';

export interface Props {
  name: string;
  renderItem: ArrayFieldRenderItemFn;
  renderContainer: ArrayFieldRenderContainerFn;
  pushItems?: number;
}

export const createArrayField = () => {
  const ArrayField: React.FC<Props> = (props) => {
    const { name: relativePath, renderItem, renderContainer, pushItems } = props;
    const [entries, setEntries] = React.useState<string[]>([]);

    const form = React.useContext(FormContext);
    const array = React.useContext(ArrayFieldContext);
    const item = React.useContext(ArrayItemContext);

    const createKey = () => `form-${form.formId}-${relativePath}-${makeId()}`;
    const path = array.path ? `${array.path}[${item.index}].${relativePath}` : relativePath;

    React.useEffect(() => {
      if (!form.initializing) {
        const initData = getByPath(path, form.formData);
        form.registerArrayField(path);
        if (initData) {
          setEntries(initData.map(() => createKey()));
        }
      }
    }, [form.initializing]);

    React.useEffect(() => {
      if (pushItems) {
        const entries: string[] = [];
        for (let i = 0; i < pushItems; i += 1) {
          entries.push(createKey());
        }
        setEntries((state) => {
          return [...state, ...entries];
        });
      }
    }, []);

    const createRemove = (index: number) => () => {
      form.removeArrayItem(path, index);
      setEntries((prevState) => [...prevState.slice(0, index), ...prevState.slice(index + 1)]);
    };

    const push = () =>
      setEntries((state) => {
        return [...state, createKey()];
      });

    const items = entries.map((key, index) => {
      const initializing = !(form.formData[path] && form.formData[path][index]);
      return (
        <ArrayFieldItem key={key} index={index}>
          {renderItem({
            index,
            remove: createRemove(index),
            item: {
              initializing,
              data: !initializing ? form.formData[path][index] : undefined,
            },
          })}
        </ArrayFieldItem>
      );
    });

    return (
      <ArrayFieldContext.Provider value={{ path, name: relativePath }}>
        {renderContainer({ items, push })}
      </ArrayFieldContext.Provider>
    );
  };

  return ArrayField;
};
