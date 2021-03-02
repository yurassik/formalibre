import * as React from 'react';
import { ArrayItemContext } from './ArrayItemContext';

interface Props {
  index: number;
}

export const ArrayFieldItem: React.FC<Props> = (props) => {
  const { index, children } = props;
  return <ArrayItemContext.Provider value={{ index }}>{children}</ArrayItemContext.Provider>;
};
