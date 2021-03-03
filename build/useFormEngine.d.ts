import { FormPayload, FormContextValue, FormEngineConfig, FormFinalData } from './types';
export declare const useFormEngine: <FD extends FormFinalData, PLD extends FormPayload, PRPS, CD, ERR>(config: FormEngineConfig<FD, PLD, CD, PRPS, ERR>, props: PRPS) => FormContextValue<FD, ERR, PLD, CD>;
