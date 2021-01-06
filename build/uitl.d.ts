import { AnyOpt } from './types';
export declare function getOptToString(opt: string | AnyOpt | AnyOpt[]): string;
export declare function checkOptType(opt: any, key?: string, type?: boolean, bol?: boolean): any;
export declare function checkOptObjType(pre_key: string, val: any): string;
export declare function expressionQuery(par_key: string, chi_key: string, value: string, _type: string, isLastOne: boolean): string;
export declare function sortSelectSql(json: AnyOpt, bool?: boolean): {
    sortkeys: any;
    result: AnyOpt;
};
export declare function handleInsertData(data: any): string;
