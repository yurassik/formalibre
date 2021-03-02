import React, { useContext } from 'react';
import { FormContext } from '../FormContext';

export interface Props {
  children: (props: { isValid: boolean; isFilled: boolean }) => React.ReactNode;
}

export const createFieldGroup = () => {
  const FieldGroup: React.FC<Props> = ({ children }) => {
    const [fields, setFields] = React.useState<string[]>();
    const [isValid, setIsValid] = React.useState<boolean>(true);
    const [isFilled, setIsFilled] = React.useState<boolean>(false);

    const { formState } = useContext(FormContext);

    React.useEffect(() => {
      if (fields) {
        let nextIsValid = true;
        let nextIsFilled = true;
        for (const path of fields) {
          if (!nextIsValid && !nextIsFilled) break;
          nextIsValid = nextIsValid ? !formState[path]?.error : nextIsValid;
          nextIsFilled =
            nextIsFilled && formState[path]?.constraints?.required ? Boolean(formState[path].value) : nextIsFilled;
        }
        setIsValid(nextIsValid);
        setIsFilled(nextIsFilled);
      }
    }, [formState, fields]);

    const registerInGroup = (path: string) => {
      setFields((prev = []) => [...prev, path]);
    };

    const unregisterInGroup = (path: string) => {
      setFields((prev = []) => {
        const idx = prev.findIndex((value) => value === path);
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      });
    };

    return (
      <FieldGroupContext.Provider value={{ registerInGroup, unregisterInGroup }}>
        {children({ isValid, isFilled })}
      </FieldGroupContext.Provider>
    );
  };

  return FieldGroup;
};

type FieldGroupContextValue = {
  registerInGroup?: (path: string) => void;
  unregisterInGroup?: (path: string) => void;
};

export const FieldGroupContext = React.createContext<FieldGroupContextValue>({});
