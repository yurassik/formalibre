import { FormPayload, FormContextValue, FormEngineConfig, FormFinalData, FormMakeConfig } from './types';
export declare const useFormEngine: <FD extends FormFinalData, PLD extends FormPayload, ERR, PRPS, CD>(config: FormEngineConfig<FD, PLD, CD, PRPS> & FormMakeConfig<ERR>, props: PRPS) => FormContextValue<FD, ERR, PLD, {}>;
