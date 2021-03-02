/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-eval */
import { useEffect, useState } from 'react';
import { FormFinalData, FinalValue, FlatStructure } from './types';

export function toArrayPath(name: string): string[] {
  const path: string[] = [];
  let sub = '';

  for (let i = 0; i < name.length; i += 1) {
    const char = name[i];

    if (['.', '[', ']'].includes(char)) {
      if (sub.length) {
        path.push(sub);
        sub = '';
      }
      continue;
    } else {
      sub += char;
    }
  }

  if (sub) {
    path.push(sub);
  }

  return path;
}

const isNumber = (entry: string) => !Number.isNaN(Number(entry));

function set(substate: FormFinalData, subpath: string[], value: FinalValue) {
  // const isArray = (entry: string) => /^\d+$/.test(entry);
  const [current, next, ...tail] = subpath;

  if (!next) {
    substate[current] = value;
    return;
  }
  if (!substate[current]) {
    substate[current] = isNumber(next) ? [] : {};
  }
  set(substate[current], [next, ...tail], value);
}

export function fromFlat(flat: FlatStructure<FinalValue>): FormFinalData {
  const state = {};

  Object.entries(flat).forEach(([path, value]) => {
    set(state, toArrayPath(path), value);
  });

  return state;
}

export function setByPath(path: string, value: FinalValue, targetObj: object): void {
  set(targetObj, toArrayPath(path), value);
}

export function getByPath(path: string, fromObj: object): any {
  let result;
  try {
    eval(`result = fromObj.${path}`);
  } catch {
    return undefined;
  }
  return result;
}

export function removeByPath(path: string, fromObj: object) {
  try {
    eval(`delete fromObj.${path}`);
  } catch {
    // empty
  }
}

export function makeId(length = 5) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function normalizeStringValue(value: string) {
  return value.trim().replace(/\s{2,}/, ' ');
}

export const useFirstRender = () => {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return isFirstRender;
};
