import * as React from "react";
import { FormMakeConfig, FormProps } from "./types";
export declare type TForm<E> = <FD, PLD = any, CD = any>(props: React.PropsWithChildren<FormProps<Partial<FD>, PLD, E>>) => JSX.Element;
export declare const createForm: <E>({ formComponent: FormComponent, ...params }: FormMakeConfig<E>) => <FD, PLD = any, CD = any>(props: React.PropsWithChildren<FormProps<Partial<FD>, PLD, E>>) => JSX.Element;
