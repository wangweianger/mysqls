import { AnyOpt } from './types';
export declare function getOptToString(opt: string | AnyOpt | AnyOpt[]): string;
export declare function checkOptType(opt: any, key?: string, type?: boolean, bol?: boolean): any;
export declare function checkOptObjType(pre_key: any, val: any): string;
export declare function expressionQuery(par_key: any, chi_key: any, value: any, _type: any, isLastOne: any): string;
export declare function sortSelectSql(json: any): {
    sortkeys: any[];
    result: any;
};
export declare function handleInsertData(data: any): string;
