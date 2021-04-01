/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo, useState, useEffect } from "react";

import {
  FormState,
  FormPayload,
  RegisterFieldFn,
  FormContextValue,
  FormEngineConfig,
  SetErrorsFn,
  FinalValue,
  ResetErrorsFn,
  Errors,
  FormFinalData,
  Constraints,
  SubmitHandlerFn,
  RegisterFieldInitData,
} from "./types";
import {
  makeId,
  setByPath,
  getByPath,
  removeByPath,
  normalizeStringValue,
} from "./utils";

export const useFormEngine = <
  FD extends FormFinalData,
  PLD extends FormPayload,
  PRPS,
  CD,
  ERR
>(
  config: FormEngineConfig<FD, PLD, CD, PRPS, ERR>,
  props: PRPS
): FormContextValue<FD, ERR, PLD, CD> => {
  const formId = useMemo(() => makeId(), []);
  const [isFirstInit, setIsFirstInit] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [formError, setFormError] = useState<ERR>(null);
  const [progress, setProgress] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [ready, setReady] = useState(false);

  const [registeredFields, setRegisteredFields] = useState<number>();
  const [mountedFields, setMountedFields] = useState<number>();

  const [payload, setPayloadState] = useState<PLD>({} as PLD);
  const [formState, setFormState] = useState<FormState<ERR>>({});
  const [formData, setFormData] = useState<Partial<FD>>({} as FD);

  const connectedData = config.useConnect && config.useConnect(props);

  const disableForm = () => setDisabled(true);

  const setPayload = (payload: Partial<PLD>) => {
    setPayloadState((prevState) => ({ ...prevState, ...payload }));
  };

  const clear = () => {
    setFormState({});
    setFormData({});
  };

  const isRequiredFieldEmpty = Object.values(formState).some(
    (field) => field?.constraints?.required && !field.value
  );
  const { initialize = () => {}, handleError = () => {} } = config;

  const onMount = async () => {
    if (initializing) {
      try {
        await initialize({
          setFormData,
          setPayload,
          disableForm,
          clear,
          connectedData,
          payload,
          formData,
          setErrors,
          setFormError,
          resetErrors,
        });
      } catch (error) {
        handleError(error, { setErrors, setFormError, resetErrors });
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      } finally {
        setInitializing(false);
        setIsFirstInit(false);
      }
    }
  };

  useEffect(() => {
    if (mountedFields === undefined || registeredFields === undefined) {
      return;
    }
    if (registeredFields === mountedFields) {
      setReady(true);
    }
  }, [registeredFields]);

  useEffect(() => {
    onMount();
  }, [initializing]);

  useEffect(
    () => {
      if (isFirstInit) {
        return;
      }
      reinit();
    },
    config.dependencies ? config.dependencies(connectedData) : []
  );

  const reinit = () => {
    setDisabled(false);
    setFormError(null);
    setPayloadState({} as PLD);
    setFormData({});
    setFormState({});
    setInitializing(true);
  };

  const setConstraints = (path: string, constraints: Constraints) => {
    setFormState((prevState) => {
      const nextState = { ...prevState };
      nextState[path].constraints = constraints;
      return nextState;
    });
  };

  const setValue = (path: string, value: FinalValue) => {
    setFormData((prevState) => {
      setByPath(path, value, prevState);
      return { ...prevState };
    });
    setFormState((prevState) => {
      const nextState = { ...prevState };
      const prevFieldData = prevState[path];
      nextState[path] = { ...prevFieldData, value, error: null };
      return nextState;
    });
  };

  const setError = (path: string, error: ERR) => {
    setFormState((prevState) => {
      if (!error) return prevState;
      const nextState = { ...prevState };
      const prevFieldData = prevState[path];
      nextState[path] = { ...prevFieldData, error };
      return nextState;
    });
  };

  const registerField: RegisterFieldFn<ERR> = (path, field) => {
    const {
      defaultValue,
      constraints,
      validate,
      customValidate,
      ref,
      autoFocus,
    } = field;
    if (autoFocus) {
      ref.current.focus();
    }
    const initValue = getByPath(path, formData);
    const value = initValue || (defaultValue ?? null);
    setFormState((prevState) => {
      const nextState = { ...prevState };
      nextState[path] = {
        value,
        defaultValue,
        constraints,
        validate,
        customValidate,
        ref,
        isRegistered: true,
        error: null,
      };
      return nextState;
    });
    setFormData((state) => {
      setByPath(path, value, state);
      return { ...state };
    });
    setRegisteredFields((prevValue = 0) => prevValue + 1);
  };

  const updateField = (
    path: string,
    { constraints }: Pick<RegisterFieldInitData<ERR>, "constraints">
  ) => {
    setFormState((prevState) => {
      const nextState = { ...prevState };
      nextState[path] = { ...nextState[path], constraints };
      return nextState;
    });
  };

  const unregisterField = (path: string) => {
    setFormState((prevState) => {
      const nextState = { ...prevState };
      delete nextState[path];
      return nextState;
    });
    setFormData((state) => {
      removeByPath(path, state);
      return { ...state };
    });
  };

  const registerArrayField = (path: string) => {
    setFormData((state) => {
      const initValue = getByPath(path, state);
      const value = initValue || [];
      setByPath(path, value, state);
      return { ...state };
    });
  };

  const removeArrayItem = (arrayPath: string, index: number) => {
    const newFormData = { ...formData };
    const array = getByPath(arrayPath, newFormData);
    const isLast = array.length - 1 === index;
    setByPath(
      arrayPath,
      [...array.slice(0, index), ...array.slice(index + 1)],
      newFormData
    );
    setFormData(newFormData);
    setFormState((state) => {
      return Object.entries(state).reduce((acc, [path, value]) => {
        if (path.startsWith(arrayPath)) {
          const escapedArrayPath = arrayPath.replace(/\[|\]/g, "\\$&");
          const reg = new RegExp(`^(${escapedArrayPath})\\[(.+)\\](\\..*)`);
          const [, , currentIndex] = reg.exec(path);
          if (isLast && Number(currentIndex) === index) {
            return acc;
          }
          if (Number(currentIndex) > index) {
            const newPath = path.replace(reg, `$1[${+currentIndex - 1}]$3`);
            return { ...acc, [newPath]: value };
          }
          return { ...acc, [path]: value };
        }
        return { ...acc, [path]: value };
      }, {});
    });
  };

  const setErrors: SetErrorsFn<ERR> = (errors) => {
    setFormState((prevState) => {
      if (!errors) return prevState;
      const nextState = { ...prevState };
      Object.entries(errors).forEach(([key, error]) => {
        nextState[key] = { ...nextState[key], error };
      });
      return nextState;
    });
  };

  const resetErrors: ResetErrorsFn = () => {
    setFormState((prevState) => {
      const nextState = Object.entries(prevState).reduce(
        (acc, [path, fieldData]) => {
          acc[path] = { ...fieldData, error: null };
          return acc;
        },
        {} as FormState<ERR>
      );

      return nextState;
    });
  };

  function validateFormState(): Errors<ERR> {
    return Object.keys(formState).reduce<{} | null>((errors, path) => {
      const error = validateField(path);
      if (error) {
        return { ...(errors || {}), [path]: error };
      }
      return errors;
    }, null);
  }

  function validateField(path: string, customValue?: any): ERR | null {
    const {
      value: fieldValue,
      validate = null,
      customValidate = null,
      constraints,
    } = formState[path];
    const value = customValue || fieldValue;
    let error = validate && validate(value, constraints);
    if (!error) {
      error = customValidate && customValidate(value, constraints, formData);
    }
    return error;
  }

  const submitHandler: SubmitHandlerFn = (middleware) => async (e) => {
    if (e) {
      e.preventDefault();
    }

    resetErrors();
    setFormError(null);
    try {
      const errors = validateFormState();
      if (errors) {
        setErrors(errors);
        return;
      }
      // TODO: add normalizer to config
      const normalizedFormData = Object.entries(formData).reduce(
        (acc, [key, value]) => {
          if (typeof value === "string") {
            return { ...acc, [key]: normalizeStringValue(value) };
          }
          return { ...acc, [key]: value };
        },
        {} as Partial<FD>
      );

      if (config.formValidate) {
        const rawError = await config.formValidate(normalizedFormData, payload);
        if (rawError) {
          throw rawError;
        }
      }

      setProgress(true);
      const submit = (mixin = {}) =>
        config.onSubmit({
          formData: { ...normalizedFormData, ...mixin },
          payload,
          connectedData,
          clear,
          disableForm,
          setFormData,
          setPayload,
        });
      await middleware(submit);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      handleError(error, { setErrors, setFormError, resetErrors });
      throw error;
    } finally {
      setProgress(false);
    }
  };

  const handleSubmit = submitHandler((submit) => submit());

  return {
    formId,
    formState,
    formData,
    formError,
    payload,
    connectedData,

    setValue,
    setConstraints,
    setError,
    setFormError,
    setPayload,
    setMountedFields,

    handleSubmit,
    submitHandler,
    registerField,
    updateField,
    unregisterField,
    registerArrayField,
    removeArrayItem,
    validateField,
    reinit,
    clear,
    ready,

    disabled,
    progress,
    initializing,
    isRequiredFieldEmpty,
  };
};
